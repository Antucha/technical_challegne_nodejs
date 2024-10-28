import { IsArray, IsDateString, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUrl } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanetInput {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nombre: string;

    @IsNumberString()
    @IsNotEmpty()
    periodoRotacion: string;

    @IsNumberString()
    @IsNotEmpty()
    periodoOrbital: string;

    @IsNumberString()
    @IsNotEmpty()
    diametro: string;

    @IsString()
    @IsNotEmpty()
    clima: string;

    @IsString()
    @IsNotEmpty()
    gravedad: string;

    @IsString()
    @IsNotEmpty()
    terreno: string;

    @IsNumberString()
    @IsNotEmpty()
    aguaSuperficial: string;

    @IsNumberString()
    @IsNotEmpty()
    poblacion: string;

    @IsArray()
    @IsUrl({}, { each: true })
    @IsNotEmpty()
    residentes: string[];

    @IsArray()
    @IsUrl({}, { each: true })
    @IsNotEmpty()
    peliculas: string[];

    @IsDateString()
    @IsNotEmpty()
    creado: string;

    @IsDateString()
    @IsNotEmpty()
    editado: string;

    @IsUrl()
    @IsNotEmpty()
    url: string;
}