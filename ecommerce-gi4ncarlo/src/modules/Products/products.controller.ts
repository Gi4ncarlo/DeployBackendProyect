import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { productsService } from './products.service';
import { Product } from './product.interface';
import { AuthGuard } from '../Auth/AuthGuard.guard';

@Controller('products')
export class productsController {
  constructor(private readonly productServic: productsService) {}

  @Get()
  async getProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 5;
    const products = await this.productServic.getProducts(
      pageNumber,
      limitNumber,
    );
    return { data: products };
  }

  @UseGuards(AuthGuard)
  @Post()
  postProducts(@Body() product: Product) {
    return this.productServic.createProduct(product);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  putProductById(): any {
    return 'this.productServic.putProduct()';
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUsersById(@Param('id') id: string): any {
    return this.productServic.deleteProductById(Number(id));
  }

  @Get(':id')
  getProductsById(@Param('id') id: string) {
    return this.productServic.getProductById(Number(id));
  }
}
