import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import typeormConfig from './config/typeorm.config';
import {UsersModule} from "./modules/users/users.module";
import {RolesModule} from "./modules/roles/roles.module";
import {PermissionsModule} from './modules/permissions/permissions.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeormConfig],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) =>
                config.getOrThrow('typeorm') as any,
        }),
        PermissionsModule,
        RolesModule,
        UsersModule

    ],
})
export class AppModule {
}
