import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    slug: string;
}
