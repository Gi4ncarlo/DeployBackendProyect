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
  HttpCode,
} from '@nestjs/common';
import { productsService } from './products.service';
import { AuthGuard } from '../Auth/AuthGuard.guard';
import { Productdto } from './Dtos/productDto.dto';
import { IsUUID } from 'class-validator';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { ImageUploadPipe } from 'src/pipes/image-upload/image-upload.pipe';

@Controller('products')
export class productsController {
  constructor(
    private readonly productServic: productsService,
    private readonly fileUploadService : FileUploadService
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

  // @Post('files/uploadImage/:id')
  // @UseInterceptors(FileInterceptor("image"))
  // postProductImages(@UploadedFile() file : Express.Multer.File){
  //   return this.cloudinaryService.uploadImage(file)
  // }

  @Post(":id/upload")
  @HttpCode(200)
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @Param("id") id : string,
    @UploadedFile(new ImageUploadPipe()) file : Express.Multer.File,
  ){
    console.log("En product controller" , id, file.size);
    
    return await this.productServic.uploadFile(file, id);
  }
  
@Get(":id/image")
@HttpCode(200)
async getImage(@Param("id") id : string){
  return this.fileUploadService.getUrl(id);
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
