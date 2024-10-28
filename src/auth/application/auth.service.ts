import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterInput } from '@/auth/infrastructure/input/user-register.input.dto';
import { UserService } from '@/user/application/user.service';
import { Profile } from '@/user/domain/profile';
import { User } from '@/user/domain/user';
import * as bcrypt from 'bcrypt';
import { RoleUserEnum } from '@/common/domain/enum/role-user.enum';
import { StateNumberEnum } from '@/common/domain/enum/state-number.enum';
import { ProfileStructure } from '@/user/domain/structure/profile.structure';
import { UserStructure } from '@/user/domain/structure/user.structure';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}
    
    private async validateUser(hashedPassword: string, password: string): Promise<any> {
        return await bcrypt.compare(password, hashedPassword);
    }

    public async login(email: string,   password: string, role: RoleUserEnum) {

        email = email?.trim().toLowerCase()
        password = password?.trim()

        const USER:UserStructure = await this.userService.getByEmail(email)

        if (!USER) {
            throw new HttpException("User doest't exist", HttpStatus.NOT_FOUND)
        }

        if (USER.state == StateNumberEnum.DELETED) {
            throw new HttpException("User is inactive", HttpStatus.FORBIDDEN)
        }

        const PROFILE: ProfileStructure = await this.userService.getProfileByUserUuid(USER.uuid)

        if (!PROFILE) {
            throw new HttpException("User profile not found", HttpStatus.NOT_FOUND)
        }

        await this.roleValidation(role, USER.isAdmin)

        const IS_VALID_USER  = await this.validateUser(USER.password, password)

        if (!IS_VALID_USER) {
            throw new HttpException("Invalid credentials", HttpStatus.FORBIDDEN)
        }

        const USER_DATA = {
            email: USER.email,
            uuid: USER.uuid,
            name: PROFILE.name,
            surname: PROFILE.surname,
            isAdmin: USER.isAdmin,
            role: USER?.role || '',
            state: StateNumberEnum[USER.state]
        }

        return {
            token: this.jwtService.sign(USER_DATA),
            user: USER_DATA
        }
    }

    private async roleValidation(role: RoleUserEnum, isAdmin: boolean) {
        if (role === RoleUserEnum.ADMIN && !isAdmin) {
            throw new HttpException("User is not an admin", HttpStatus.FORBIDDEN)
        }
    }

    public async register(input: UserRegisterInput) {

        input.email = input.email.trim().toLowerCase()

        const USER_EXIST = await this.userService.getByEmail(input.email)

        if (USER_EXIST) {
            throw new HttpException("User already exists", HttpStatus.BAD_REQUEST)
        }

        const EXTRA_DATA = {

        }
        
        const USER_STRUCTURE = UserStructure.create(
            input.email, 
            await this.hashPassword(input.password.trim()),
            input.role,
            input.isAdmin,
            StateNumberEnum.ACTIVE
        )
        
        const PROFILE_STRUCTURE = ProfileStructure.create(
            USER_STRUCTURE.uuid,
            input.name.trim(), 
            input.surname.trim(),
            input.birthDate,
            input.countryCodePhone,
            input.phone,
            input.countryCallingCodePhone,
            false,
            JSON.parse(JSON.stringify(EXTRA_DATA))
        )
       
        await this.userService.saveProfile(PROFILE_STRUCTURE)


        await this.userService.save(USER_STRUCTURE)

        return {
            ...PROFILE_STRUCTURE,
            ...USER_STRUCTURE
        }

    }

    private async hashPassword(password: string): Promise<string> {
        const SALT = bcrypt.genSaltSync(10);

        return await bcrypt.hash(password, SALT);
    }
}
