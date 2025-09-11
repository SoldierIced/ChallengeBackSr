import {Body, Controller, Get, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SiginDto} from "./dto/sigin.dto";
import {ApiTags} from "@nestjs/swagger";
import {UsersService} from "../users/users.service";
import {GetUser} from "../../common/decorators/get-user.decorator";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RolesPermissionsGuard} from "../../common/guards/roles-permissions.guard";
import {PermissionName} from "../permissions/permissions-constant";
import {Permissions} from "../../common/decorators/permissions.decorator";

@ApiTags('auth')
@Controller({version: 'v1', path: 'auth'})
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
        console.log(user);
        return this.authService.me(user.id);
    }


}
