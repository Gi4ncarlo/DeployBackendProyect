import { registerAs } from "@nestjs/config";
import { DataSourceOptions, DataSource } from "typeorm";
import * as dotenv from "dotenv"

dotenv.config({
    path: ".env.development"
})

const SqliteTestDataSourceOptions: DataSourceOptions = {
    type: "sqlite",
    database: ":memory:",
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: true,
    //dropSchema: true
}

const PostgresDataSourceOptions : DataSourceOptions = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: true,
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    migrations:["dist/migration/*{.ts,.js}"],
    subscribers : [],
    //dropSchema : true,
<<<<<<< HEAD
    ssl: {
        rejectUnauthorized: false,
=======
       ssl: {
        rejectUnauthorized: false, // Esto evita errores en desarrollo si no se confía en el certificado
>>>>>>> 8c7e4bb0122f9cdab7b2868c218f904f6d8861de
    },
}

export const PostgresDataSourceConfig = registerAs(
    "postgres",
    ()=> PostgresDataSourceOptions,
);

export const sqliteDataSourceConfig = registerAs(
    "sqlite",
    () => SqliteTestDataSourceOptions,
)

export const PostgresDataSource = new DataSource(PostgresDataSourceOptions)

export const SqliteDataSource = new DataSource(SqliteTestDataSourceOptions)
