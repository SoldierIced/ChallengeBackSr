import {IsDecimal, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import {Column} from "typeorm";

export class SiginDto {
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(160)
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}
