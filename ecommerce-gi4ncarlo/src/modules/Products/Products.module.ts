import { Module } from '@nestjs/common';
import { productsController } from './products.controller';
import { productsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from 'src/config/cloudinary';


@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [productsController],
  providers: [productsService, 
    CloudinaryConfig,
    CloudinaryService],
  exports : [productsService]
})
export class ProductsModule {}