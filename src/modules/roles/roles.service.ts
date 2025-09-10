import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import {Role} from './entities/role.entity';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';
import {Permission} from "../permissions/entities/permission.entity";
import {StringToSlug} from "../../common/utils";
import {LENGTH_SLUG_ROLE} from "./roles-constant";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {
    }

    async create(dto: CreateRoleDto): Promise<Role> {
        let permissions: Permission[] = [];
        if (dto.permissionIds?.length) {
            permissions = await this.permissionRepository.find({
                where: {id: In(dto.permissionIds)},
            });
        }

        const role = this.roleRepository.create({
            name: dto.name,
            slug:StringToSlug(dto.slug ?? dto.name,LENGTH_SLUG_ROLE),
            permissions,
        });
        return this.roleRepository.save(role);
    }

    findAll(): Promise<Role[]> {
        return this.roleRepository.find({relations: ['permissions']});
    }

    async findOne(id: string): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {id}, relations: ['permissions']});
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }

    async update(id: string, dto: UpdateRoleDto): Promise<Role> {
        const role = await this.findOne(id);
        Object.assign(role, dto);
        return this.roleRepository.save(role);
    }

    async remove(id: string): Promise<void> {
        const role = await this.findOne(id);
        await this.roleRepository.remove(role);
    }
}
