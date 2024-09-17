import { Injectable } from '@nestjs/common';
import { Productdto } from './Dtos/productDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class productsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
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

  async createProduct(product: Productdto): Promise<Product> {
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
}
