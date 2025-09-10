import {registerAs} from '@nestjs/config';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export default registerAs('typeorm', (): TypeOrmModuleOptions => ({
    type: (process.env.DB_TYPE as any) ?? 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOGGING === 'true',
}));
