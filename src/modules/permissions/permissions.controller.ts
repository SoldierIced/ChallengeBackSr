import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus} from '@nestjs/common';
import {PermissionsService} from './permissions.service';
import {CreatePermissionDto} from './dto/create-permission.dto';
import {UpdatePermissionDto} from './dto/update-permission.dto';
import {ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RolesPermissionsGuard} from "../../common/guards/roles-permissions.guard";
import {Permissions} from "../../common/decorators/permissions.decorator";
import {NAME_PERMISSION, PermissionName} from "./permissions-constant";
import {SUCCESS_MESSAGES} from "../../common/constants";

@ApiTags('permissions')
@Controller({version: '1', path: 'permissions'})
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.CREATE_PERMISSION)
    async create(@Body() createPermissionDto: CreatePermissionDto) {
        const data = await this.permissionsService.create(createPermissionDto);
        return {data, message: SUCCESS_MESSAGES.CREATE(NAME_PERMISSION)}
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.VIEW_PERMISSION)
    findAll() {
        return this.permissionsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.VIEW_PERMISSION)
    findOne(@Param('id') id: string) {
        return this.permissionsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.CREATE_PERMISSION)
    async update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
        const data = await this.permissionsService.update(id, updatePermissionDto);
        return {data, message: SUCCESS_MESSAGES.UPDATE(NAME_PERMISSION)}
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.DELETE_PERMISSION)
    async remove(@Param('id') id: string) {
        await this.permissionsService.remove(id);
        return {message: SUCCESS_MESSAGES.DELETE(NAME_PERMISSION)};
    }
}
