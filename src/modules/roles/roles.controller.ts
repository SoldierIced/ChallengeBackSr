import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {RolesService} from './roles.service';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';
import {ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RolesPermissionsGuard} from "../../common/guards/roles-permissions.guard";
import {Permissions} from "../../common/decorators/permissions.decorator";
import {PermissionName} from "../../common/constants";
import {NAME_ROLE, SUCCESS_MESSAGES} from "../../common/constants";

@ApiTags('roles')
@Controller({version: '1', path: 'roles'})
export class RolesController {
    constructor(private readonly rolesService: RolesService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.CREATE_ROLE)
    async create(@Body() createRoleDto: CreateRoleDto) {
        const data = await this.rolesService.create(createRoleDto);
        return {data, message: SUCCESS_MESSAGES.CREATE(NAME_ROLE)};

    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.VIEW_ROLE)
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.VIEW_ROLE)
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.UPDATE_ROLE)
    async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        const data = await this.rolesService.update(id, updateRoleDto);
        return {data, message: SUCCESS_MESSAGES.UPDATE(NAME_ROLE)}
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.DELETE_ROLE)
    async remove(@Param('id') id: string) {
        const data = await this.rolesService.remove(id);
        return {data, message: SUCCESS_MESSAGES.DELETE(NAME_ROLE)}
    }
}
