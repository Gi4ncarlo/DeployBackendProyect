/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/Products/Products.module';
import { UsersModule } from './modules/Users/Users.module';
import { AuthModule } from './modules/Auth/Auth.module';
import { userService } from './modules/Users/users.service';
import { productsService } from './modules/Products/products.service';
import { authService } from './modules/Auth/Auth.service';

@Module({
  imports: [UsersModule, ProductsModule, AuthModule],
  controllers: [],
  providers: [userService, productsService, authService],
})
export class AppModule {}
