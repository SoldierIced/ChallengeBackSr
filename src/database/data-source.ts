import 'reflect-metadata';
import {DataSource} from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: (process.env.DB_TYPE as any) ?? 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: process.env.DB_LOGGING === 'true',
});
