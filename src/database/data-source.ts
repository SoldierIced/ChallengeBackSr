import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import typeormConfig from "../config/typeorm.config";

dotenv.config();

const typeOrmConfig = typeormConfig();

export const AppDataSource = new DataSource({
    ...typeOrmConfig,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
});
