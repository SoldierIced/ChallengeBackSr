import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Permission} from './entities/permission.entity';
import {CreatePermissionDto} from './dto/create-permission.dto';
import {UpdatePermissionDto} from './dto/update-permission.dto';
import {StringToSlug} from "../../common/utils";
import {LENGTH_SLUG_PERMISSION} from "./permissions-constant";

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {
    }

    async create(dto: CreatePermissionDto): Promise<Permission> {
        const permission = this.permissionRepository.create({
            name: dto.name,
            slug: StringToSlug(dto.slug ?? dto.name,LENGTH_SLUG_PERMISSION),
        });
        return await this.permissionRepository.save(permission);
    }

    async findAll(): Promise<Permission[]> {
        return await this.permissionRepository.find();
    }

    async findOne(id: string): Promise<Permission> {
        const permission = await this.permissionRepository.findOne({where: {id}});
        if (!permission) {
            throw new NotFoundException(`Permission with id ${id} not found`);
        }
        return permission;
    }

    async update(id: string, dto: UpdatePermissionDto): Promise<Permission> {
        const permission = await this.findOne(id);
        Object.assign(permission, dto);
        return await this.permissionRepository.save(permission);
    }

    async remove(id: string): Promise<void> {
        const permission = await this.findOne(id);

        await this.permissionRepository.remove(permission);
    }
}
