import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/modules/categories/entities/category.entity";
import { Product } from "src/modules/Products/product.entity";
import { CategoriesSeed } from "./categories/categories.seed";
import { ProductsSeed } from "./products/products.seed";
import { User } from "src/modules/Users/user.entity";
import { UsersSeed } from "./users/users.seed";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product, User])],
    providers: [CategoriesSeed, ProductsSeed, UsersSeed],
    exports: [CategoriesSeed, ProductsSeed, UsersSeed]
})
export class SeedsModule {}