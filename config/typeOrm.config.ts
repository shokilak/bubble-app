import 'dotenv/config'

import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {EntitiesArray} from "./entities.array";

export class TypeOrmConfig implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            entities: EntitiesArray,
            synchronize: true,
        };
    }
}