import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { SeedService } from './seed.service';

@Module({
    imports: [TypeOrmModule.forFeature([Role, Permission])],
    providers: [SeedService],
    exports: [SeedService],
})
export class SeedModule {}
