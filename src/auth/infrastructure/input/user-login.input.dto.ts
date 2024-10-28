import { RoleUserEnum } from '@/common/domain/enum/role-user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserLoginInput {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEnum(RoleUserEnum, { message: 'role must be a valid enum value' })
    role: RoleUserEnum;
}
