import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';

import {ConfigModule, ConfigType} from '@nestjs/config';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from '../users/users.module';
import jwtConfig from "../../config/jwt.config";
import {JwtStrategy} from "./strategies/jwt.strategy";


@Module({
    imports: [
        UsersModule,
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync({
            imports: [ConfigModule.forFeature(jwtConfig)],
            inject: [jwtConfig.KEY],
            useFactory: (jwtCfg: ConfigType<typeof jwtConfig>) => ({
                secret: jwtCfg.secret,
                signOptions: {expiresIn: jwtCfg.expiresIn},
            }),
        }),
    ],
    providers: [AuthService,JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService,JwtModule],
})
export class AuthModule {
}
