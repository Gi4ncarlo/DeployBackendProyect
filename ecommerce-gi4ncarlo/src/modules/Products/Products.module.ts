import { Module } from '@nestjs/common';
import { productsController } from './products.controller';
import { productsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [productsController],
  providers: [productsService],
  exports : [productsService]
})
export class ProductsModule {}