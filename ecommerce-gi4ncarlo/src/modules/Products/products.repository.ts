import { Injectable } from "@nestjs/common";
import { Product } from "./product.interface";
import { Productdto } from "./Dtos/productDto.dto";


@Injectable()
export class ProductsRepository {

    private products = [
        {
            id: 1,
            name: "Electric Shaver",
            description: "A high-quality electric shaver with multiple settings.",
            price: 79.99,
            stock: true,
            imgUrl: "https://example.com/images/shaver.jpg"
        },
        {
            id: 2,
            name: "Beard Trimmer",
            description: "Precision beard trimmer with adjustable lengths.",
            price: 45.50,
            stock: true,
            imgUrl: "https://example.com/images/trimmer.jpg"
        },
        {
            id: 3,
            name: "Hair Styling Gel",
            description: "Long-lasting hair gel for a strong hold.",
            price: 15.25,
            stock: false,
            imgUrl: "https://example.com/images/gel.jpg"
        },
        {
            id: 4,
            name: "Barber Scissors",
            description: "Professional-grade barber scissors made of stainless steel.",
            price: 120.00,
            stock: true,
            imgUrl: "https://example.com/images/scissors.jpg"
        },
        {
            id: 5,
            name: "Aftershave Balm",
            description: "Soothing aftershave balm with a fresh scent.",
            price: 25.99,
            stock: false,
            imgUrl: "https://example.com/images/aftershave.jpg"
        }
    ]

    async getProducts(page: number = 1, limit: number = 5): Promise<Productdto[]> {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return this.products.slice(startIndex, endIndex);
    }

   async getById(id: number) {
        return this.products.find((product) => product.id === id)
    }

    async createProduct(product : Omit<Product, "id">){
        const id = this.products.length + 1;
        this.products = [...this.products, {id, ...product}];
        return id;
    }

    async deleteProductById(id: number): Promise<number> {
        this.products = this.products.filter((product) => product.id !== id);
        return id;
      }
}