import { Injectable } from '@nestjs/common';
import { ProductDto } from './Dtos/productDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { UploadFileDto } from 'src/file-upload/dtos/UploadFile.dto';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class productsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly fileUploadService : FileUploadService
  ) {}

  async getProducts(page: number, limit: number) {
    const skip = (page - 1) * limit;

    return await this.productRepository.find({
      take: limit,
      skip: skip,
    });
  }

  async getProductById(id: string) {
    return await this.productRepository.findOneBy({ id });
  }

  async createProduct(product: ProductDto): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<{ id: string }> {
    await this.productRepository.delete(id);
    return { id };
  }

  async buyProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (product.stock === 0) {
      throw new Error('Out of Stock');
    }

    await this.productRepository.update(id, {
      stock: product.stock - 1,
    });

    console.log('Producto comprado exitosamente');
    return product.price;
  }

  async uploadFile(file : UploadFileDto, id : string){
    console.log("File uploaded, URL received 111: productService", id);

    const url = await this.fileUploadService.uploadFile({
      fieldname : id,
      buffer : file.buffer,
      originalname : file.originalname,
      mimetype : file.mimetype,
      size : file.size
    });

    console.log("File uploaded, URL received: productService", url);

    await this.productRepository.update(id, { imgUrl : url})
    return { imgUrl : url};
  }
}
