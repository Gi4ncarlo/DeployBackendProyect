import { Module } from '@nestjs/common';
import { productsController } from './products.controller';
import { productsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CloudinaryService } from './cloudinary.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileUploadModule } from 'src/file-upload/file-upload.module';


@Module({
  imports: [TypeOrmModule.forFeature([Product]), FileUploadModule],
  controllers: [productsController],
  providers: [productsService, FileUploadService, CloudinaryService],
  exports : [productsService]
})
export class ProductsModule {}