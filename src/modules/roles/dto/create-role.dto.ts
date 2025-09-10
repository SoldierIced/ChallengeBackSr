import {IsArray, IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    slug: string;

    @IsOptional()
    @IsArray()
    permissionIds?: string[];
}
