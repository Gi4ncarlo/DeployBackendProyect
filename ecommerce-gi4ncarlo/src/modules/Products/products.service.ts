import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.interface';

@Injectable()
export class productsService {

    constructor(private productsRepository : ProductsRepository){}
    getProducts(page: number, limit: number) {
        return this.productsRepository.getProducts(page, limit)
    }

    getProductById(id: number) {
        return this.productsRepository.getById(id);
    }

    createProduct(product : Omit<Product, "id">) : Promise<number>{
        return this.productsRepository.createProduct(product);
    }

    deleteProductById(id: number): Promise <number> {
        return this.productsRepository.deleteProductById(id)
    }
    
}