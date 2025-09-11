import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RolesPermissionsGuard} from "../../common/guards/roles-permissions.guard";
import {PermissionName} from "../permissions/permissions-constant";
import {Permissions} from "../../common/decorators/permissions.decorator";
import {UserOwnershipGuard} from "../../common/guards/user-owner-ship-.guard";
import {ViewUserGuard} from "../../common/guards/view-user.guard";

@ApiTags('users')
@Controller({version: 'v1', path: 'users'})
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
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
    @UseGuards(JwtAuthGuard, UserOwnershipGuard)
    update(@Param('userId') userId: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(userId, dto);
    }

    @Delete(':userId')
    remove(@Param('userId') userId: string) {
        return this.usersService.remove(userId);
    }
}
