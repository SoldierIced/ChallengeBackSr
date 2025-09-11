import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RolesPermissionsGuard} from "../../common/guards/roles-permissions.guard";
import {PermissionName} from "../permissions/permissions-constant";
import {Permissions} from "../../common/decorators/permissions.decorator";
import {ViewUserGuard} from "../../common/guards/view-user.guard";
import {HideFieldsInterceptor} from "../../common/interceptors/hides-fields.interceptor";
import {SUCCESS_MESSAGES} from "../../common/constants";
import {USER_NAME} from './users.constant';

@ApiTags('users')
@UseInterceptors(HideFieldsInterceptor)
@Controller({version: '1', path: 'users'})
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.CREATE_USER)
    async create(@Body() dto: CreateUserDto) {
        const data = await this.usersService.create(dto);
        return {data, message: SUCCESS_MESSAGES.CREATE(USER_NAME)}
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.VIEW_ALL_USERS)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':userId')
    @UseGuards(JwtAuthGuard, ViewUserGuard)
    findOne(@Param('userId') userId: string) {
        return this.usersService.findOne(userId);
    }

    @Patch(':userId')
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.UPDATE_USER)
    async update(@Param('userId') userId: string, @Body() dto: UpdateUserDto) {
        const data = await this.usersService.update(userId, dto);
        return {data, message: SUCCESS_MESSAGES.CREATE(USER_NAME)}
    }

    @Patch(':userId')
    @UseGuards(JwtAuthGuard, ViewUserGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.UPDATE_ME)
    updateMe(@Param('userId') userId: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(userId, dto);
    }

    @Delete(':userId')
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.DELETE_USER)
    async remove(@Param('userId') userId: string) {
        const data = await this.usersService.remove(userId);
        return {data, message: SUCCESS_MESSAGES.CREATE(USER_NAME)}
    }
}
