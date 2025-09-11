import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import {Role} from 'src/modules/roles/entities/role.entity';
import {Permission} from 'src/modules/permissions/entities/permission.entity';
import {DEFAULT_ROLES, DEFAULT_PERMISSIONS, RoleName, hashPassword, ROLE_PERMISSIONS} from 'src/common/constants';
import {User} from "../../modules/users/entities/user.entity";

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async run() {
        this.logger.log('Starting seed.');

        await this.permissionsSeed();
        await this.rolesSeed();
        await this.assignPermissionToRoles();

        await this.userSeed();
        this.logger.log('Seed finished');
    }

    async assignPermissionToRoles() {
        for (const roleName of Object.keys(ROLE_PERMISSIONS) as RoleName[]) {
            const role = await this.roleRepository.findOne({
                where: {slug: roleName},
                relations: ['permissions'],
            })

            if (!role) continue;

            role.permissions = await this.permissionRepository.findBy({
                slug: In(ROLE_PERMISSIONS[roleName])
            });
            await this.roleRepository.save(role);
            this.logger.log(`Roles assigned to role ${role.slug}`);
        }

    }

    async userSeed() {
        const usersData = [
            {email: "admin@mail.com", name: "admin", password: "Admin123!", salary: 200.05, role: RoleName.ADMIN},
            {email: "manager@mail.com", name: "manager", password: "Manager123!", salary: 120, role: RoleName.MANAGER},
            {email: "user1@mail.com", name: "user1", password: "User123!", salary: 154, role: RoleName.USER},
            {email: "user2@mail.com", name: "user2", password: "User123!", salary: 111.92, role: RoleName.USER},
            {email: "user3@mail.com", name: "user3", password: "User123!", salary: 100, role: RoleName.USER},
        ];

        for (const user of usersData) {
            const exist = await this.userRepository.findOne({where: {email: user.email}});
            if (!exist) {

                const role = await this.roleRepository.findOne({where: {slug: user.role}});
                if (!role) {
                    this.logger.warn(`warning role ${user.role} not exist`);
                    continue;
                }
                const userDb = this.userRepository.create({
                    name: user.name,
                    email: user.email,
                    salary: user.salary,
                    password:await hashPassword(user.password),
                    role,
                });
                await this.userRepository.save(userDb);
                this.logger.log(`created user : ${user.email}`);
            }
        }


    }

    async rolesSeed() {
        for (const role of DEFAULT_ROLES) {
            const exists = await this.roleRepository.findOne({where: {slug: role.slug}});
            if (!exists) {
                await this.roleRepository.save(this.roleRepository.create(role));
                this.logger.log(`Created role: ${role.slug}`);
            }
        }
    }

    async permissionsSeed() {
        for (const perm of DEFAULT_PERMISSIONS) {
            const exists = await this.permissionRepository.findOne({where: {slug: perm.slug}});
            if (!exists) {
                await this.permissionRepository.save(this.permissionRepository.create(perm));
                this.logger.log(`Created permission: ${perm.slug}`);
            }
        }
    }
}
