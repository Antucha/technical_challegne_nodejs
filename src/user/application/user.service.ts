import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrastructure/database/repository/user.repository';
import { ProfileRepository } from '../infrastructure/database/repository/profile.repository';
import { Auth } from '@/auth/domain/auth';
import { StateNumberEnum } from '../../common/domain/enum/state-number.enum';
import { UserStructure } from '../domain/structure/user.structure';
import { ProfileStructure } from '../domain/structure/profile.structure';

@Injectable()
export class UserService {
    constructor(
        protected readonly userRepository: UserRepository,
        protected readonly profileRepository: ProfileRepository
    ) {}

    public async getByEmail(email: string): Promise<UserStructure | undefined>{

        console.log(this.userRepository)
        const USER_ENTITY: UserStructure = await this.userRepository.getOneByEmail(email)

        if(!USER_ENTITY) {
            return undefined
        }

        console.log(USER_ENTITY)

        return USER_ENTITY

    }

    public async getProfileByUserUuid(uuid: string) {
        const PROFILE = await this.profileRepository.getOneByUserUuid(uuid)

        return PROFILE
    }
    public async save(user: UserStructure) {

        const USER_ENTITY_BUILT = user

        await this.userRepository.create(USER_ENTITY_BUILT)
    }

    public async saveProfile(profile: ProfileStructure) {
        const PROFILE_ENTITY_BUILT = profile

        await this.profileRepository.create(PROFILE_ENTITY_BUILT)
    }

    public async getOneByUuid(uuid: string): Promise<UserStructure> {
        const USER_ENTITY: UserStructure = await this.userRepository.getOneByUuid(uuid)

        if(!USER_ENTITY) {
            throw new Error('User not found')
        }

        return USER_ENTITY
    }

    public async getAll(startAt: string, endAt: string): Promise<UserStructure[]> {
        const USERS_ENTITIES: UserStructure[] = await this.userRepository.getAll()


        return USERS_ENTITIES.map(user => user) 
    }

    public async verifyStatus(auth: Auth) {

        const USER_ENTITY: UserStructure = await this.userRepository.getOneByUuid(auth.uuid)

        if(!USER_ENTITY) {
            // throw new HttpExce('User not found')
        }

        return StateNumberEnum[USER_ENTITY.state]
    }
}
