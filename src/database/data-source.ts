import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import typeormConfig from "../config/typeorm.config";

dotenv.config();

const typeOrmConfig = typeormConfig();

export const AppDataSource = new DataSource({
    ...typeOrmConfig,
    entities: ['dist/**/*.entity.js'],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    synchronize: false,
});
