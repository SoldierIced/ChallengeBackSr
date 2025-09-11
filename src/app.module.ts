import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService, ConfigType} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import typeormConfig from './config/typeorm.config';
import {UsersModule} from "./modules/users/users.module";
import {RolesModule} from "./modules/roles/roles.module";
import {PermissionsModule} from './modules/permissions/permissions.module';
import {SeedModule} from "./database/seed/seed.module";
import { AuthModule } from './modules/auth/auth.module';
import jwtConfig from "./config/jwt.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeormConfig,jwtConfig],
        }),
        TypeOrmModule.forRootAsync({
            inject: [typeormConfig.KEY],
            useFactory: (dbConfig: ConfigType<typeof typeormConfig>) => ({
                ...dbConfig,
                autoLoadEntities: true,
                synchronize: false,
            }),
        }),
        PermissionsModule,
        RolesModule,
        UsersModule,
        SeedModule,
        AuthModule,

    ],
})
export class AppModule {
}
