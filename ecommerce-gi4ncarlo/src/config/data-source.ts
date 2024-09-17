import { registerAs } from "@nestjs/config";
import { DataSourceOptions, DataSource } from "typeorm";
import * as dotenv from "dotenv"

dotenv.config({
    path: ".env.development"
})

const PostgresDataSourceOptions : DataSourceOptions = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: true,
    entities:["dist/**/*.entity{.ts,.js}"],
    migrations:["dist/migration/*{.ts,.js}"],
    subscribers : [],
   // dropSchema : true,
    //ssl: true
}

export const PostgresDataSourceConfig = registerAs(
    "postgres",
    ()=> PostgresDataSourceOptions,
);

export const PostgresDataSource = new DataSource(PostgresDataSourceOptions)