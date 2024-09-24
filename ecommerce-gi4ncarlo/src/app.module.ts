import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/Products/Products.module';
import { UsersModule } from './modules/Users/Users.module';
import { AuthModule } from './modules/Auth/Auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderDetailsModule } from './modules/order-details/order-details.module';
import { PostgresDataSourceConfig } from './config/data-source';
import { SeedsModule } from './seeds/seeds.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { SharedModule } from './shared/shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [PostgresDataSourceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('postgres'),
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
  controllers: [],
  providers: [],
})
export class AppModule {}