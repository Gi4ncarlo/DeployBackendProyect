import { Module } from '@nestjs/common';
import { productsController } from './products.controller';
import { productsService } from './products.service';

@Module({
 // imports: [],
  controllers: [productsController],
  providers: [productsService],
})
export class ProductsModule {}