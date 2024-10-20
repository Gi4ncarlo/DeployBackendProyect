import { registerAs } from '@nestjs/config';
import { DataSourceOptions, DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.development',
});

const SqliteTestDataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  //dropSchema: true
};

const PostgresDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false, //CAMBIO A FALSO CUANDO HAGO MIGRACION PARA EVITAR QUE MODIFIQUE SOLO
  logging: true,
  entities: [__dirname + '/../modules/**/*.entity{.ts,.js}',],  
  migrations: [__dirname + '/../migration/*{.ts,.js}'],
  subscribers: [],
  ssl: false,
  //dropSchema : true,
  // ssl: {
  //   rejectUnauthorized: false, // Esto evita errores en desarrollo si no se confía en el certificado
  // },
};

export const PostgresDataSourceConfig = registerAs(
  'postgres',
  () => PostgresDataSourceOptions,
);

export const sqliteDataSourceConfig = registerAs(
  'sqlite',
  () => SqliteTestDataSourceOptions,
);

export const PostgresDataSource = new DataSource(PostgresDataSourceOptions);

//export const SqliteDataSource = new DataSource(SqliteTestDataSourceOptions);
