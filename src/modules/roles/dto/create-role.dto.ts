import {IsArray, IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import {LENGTH_NAME_ROLE, LENGTH_SLUG_ROLE} from "../roles-constant";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(LENGTH_NAME_ROLE)
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(LENGTH_SLUG_ROLE)
    slug: string;

    @IsOptional()
    @IsArray()
    permissionIds?: string[];
}
