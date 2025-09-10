import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { DEFAULT_ROLES, DEFAULT_PERMISSIONS } from 'src/common/constants';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
      @InjectRepository(Role)
      private readonly roleRepository: Repository<Role>,
      @InjectRepository(Permission)
      private readonly permissionRepository: Repository<Permission>,
  ) {}

  async run() {
    this.logger.log('Starting seed.');

    // Roles
    for (const role of DEFAULT_ROLES) {
      const exists = await this.roleRepository.findOne({ where: { slug: role.slug } });
      if (!exists) {
        await this.roleRepository.save(this.roleRepository.create(role));
        this.logger.log(`Created role: ${role.slug}`);
      }
    }

    // Permissions
    for (const perm of DEFAULT_PERMISSIONS) {
      const exists = await this.permissionRepository.findOne({ where: { slug: perm.slug } });
      if (!exists) {
        await this.permissionRepository.save(this.permissionRepository.create(perm));
        this.logger.log(`Created permission: ${perm.slug}`);
      }
    }

    this.logger.log('Seed finished');
  }
}
