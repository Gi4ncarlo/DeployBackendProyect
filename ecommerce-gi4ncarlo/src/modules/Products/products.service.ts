import { Injectable } from '@nestjs/common';

@Injectable()
export class productsService {
    getProducts() : string {
        return "Get Products"
    }
}