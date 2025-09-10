import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { SeedService } from './seed.service';
import {User} from "../../modules/users/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Role, Permission,User])],
    providers: [SeedService],
    exports: [SeedService],
})
export class SeedModule {}
