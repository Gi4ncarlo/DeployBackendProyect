import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { User } from '../Users/user.entity';
import { Product } from '../Products/product.entity';
import { UsersModule } from '../Users/Users.module';
import { ProductsModule } from '../Products/Products.module';
import { OrderDetailsModule } from '../order-details/order-details.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Order, OrderDetail, User, Product]),
    UsersModule,
    ProductsModule,
    OrderDetailsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
