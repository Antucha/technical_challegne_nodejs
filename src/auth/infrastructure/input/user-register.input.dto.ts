import { IsBoolean, IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UserRegisterInput {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsNotEmpty()
    @IsString()
    fullPhone: string;

    @IsNotEmpty()
    @IsString()
    countryCodePhone: string;

    @IsNotEmpty()
    @IsString()
    countryCallingCodePhone: string

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsDateString()
    birthDate: string;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsNotEmpty()
    @IsBoolean()
    isAdmin: boolean;
}