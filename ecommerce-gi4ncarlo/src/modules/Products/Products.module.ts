import { Module } from '@nestjs/common';
import { productsController } from './products.controller';
import { productsService } from './products.service';
import { ProductsRepository } from './products.repository';

@Module({
 // imports: [],
  controllers: [productsController],
  providers: [productsService, ProductsRepository],
})
export class ProductsModule {}