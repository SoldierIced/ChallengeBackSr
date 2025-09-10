import {IsDecimal, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import {Column} from "typeorm";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(160)
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsDecimal({decimal_digits:"2"})
    salary: number;
}
