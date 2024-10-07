import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/Products/Products.module';
import { UsersModule } from './modules/Users/Users.module';
import { AuthModule } from './modules/Auth/Auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderDetailsModule } from './modules/order-details/order-details.module';
import { PostgresDataSourceConfig, sqliteDataSourceConfig } from './config/data-source';
import { SeedsModule } from './seeds/seeds.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { SharedModule } from './shared/shared/shared.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development", "env"],
      isGlobal: true,
      load: [PostgresDataSourceConfig, sqliteDataSourceConfig, () => ({
        environment: process.env.ENVIRONMENT || "TEST"
      })],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('environment') === "TEST" ? configService.get("sqlite") : configService.get("postgres"),
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    OrderDetailsModule,
    SeedsModule,
    FileUploadModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}