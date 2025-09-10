import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import {LENGTH_NAME_PERMISSION, LENGTH_SLUG_PERMISSION} from "../permissions-constant";

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(LENGTH_NAME_PERMISSION)
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(LENGTH_SLUG_PERMISSION)
    slug: string;
}
