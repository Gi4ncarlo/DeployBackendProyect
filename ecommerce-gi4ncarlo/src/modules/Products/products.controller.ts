import { Controller, Get } from "@nestjs/common";
import { productsService }  from "./products.service"

@Controller("products")
export class productsController {
    constructor(private readonly productServic : productsService) {}

    @Get()
    getProducts() : string {
        return this.productServic.getProducts();
    }
}