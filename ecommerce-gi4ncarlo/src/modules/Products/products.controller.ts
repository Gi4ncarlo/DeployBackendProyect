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
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { productsService } from './products.service';
import { AuthGuard } from '../Auth/AuthGuard.guard';
import { Productdto } from './Dtos/productDto.dto';
import { IsUUID } from 'class-validator';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class productsController {
  constructor(
    private readonly productServic: productsService,
    private readonly cloudinaryService : CloudinaryService
  ) {}

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
  @UsePipes(new ValidationPipe())
  postProducts(@Body() product: Productdto) {
    return this.productServic.createProduct(product);
  }

  @Post('files/uploadImage/:id')
  @UseInterceptors(FileInterceptor("image"))
  postProductImages(@UploadedFile() file : Express.Multer.File){
    return this.cloudinaryService.uploadImage(file)
  }

  
  @UseGuards(AuthGuard)
  @Put(':id')
  putProductById(): any {
    return 'this.productServic.putProduct()';
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUsersById(@Param('id') id: string): any {
    return this.productServic.remove(id);
  }

  @Get(':id')
  async getProductsById(@Param('id', new ParseUUIDPipe()) id: string) {
   const product = await this.productServic.getProductById(id);
   if(!IsUUID(4, { each : true})){
    throw new HttpException("UUID Invalida", HttpStatus.BAD_REQUEST)
   }

   if(!product){
    throw new HttpException("Producto no encontrado", HttpStatus.NOT_FOUND)
   }

   return product;
  }
    
}
