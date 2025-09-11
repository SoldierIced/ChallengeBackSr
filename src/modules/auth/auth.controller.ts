import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UnauthorizedException,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SiginDto} from "./dto/sigin.dto";
import {ApiTags} from "@nestjs/swagger";
import {UsersService} from "../users/users.service";
import {GetUser} from "../../common/decorators/get-user.decorator";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RolesPermissionsGuard} from "../../common/guards/roles-permissions.guard";
import {PermissionName} from "../permissions/permissions-constant";
import {Permissions} from "../../common/decorators/permissions.decorator";
import {HideFieldsInterceptor} from "../../common/interceptors/hides-fields.interceptor";

@ApiTags('auth')
@Controller({ path: 'auth' ,version: '1'})
@UseInterceptors(HideFieldsInterceptor)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() sigInDto: SiginDto) {
        return this.authService.sigIn(sigInDto.email, sigInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard,RolesPermissionsGuard)
    @Permissions(PermissionName.VIEW_ME)
    @Get('me')
    async me(@GetUser() user :any) {
        return this.authService.me(user.id);
    }


}
