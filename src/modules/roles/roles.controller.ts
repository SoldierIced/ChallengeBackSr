import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {RolesService} from './roles.service';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';
import {ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RolesPermissionsGuard} from "../../common/guards/roles-permissions.guard";
import {Permissions} from "../../common/decorators/permissions.decorator";
import {PermissionName} from "../permissions/permissions-constant";

@ApiTags('roles')
@Controller({version: '1', path: 'roles'})
export class RolesController {
    constructor(private readonly rolesService: RolesService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.CREATE_ROLE)
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
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
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
    @Permissions(PermissionName.DELETE_ROLE)
    remove(@Param('id') id: string) {
        return this.rolesService.remove(id);
    }
}
