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
  NotFoundException,
} from '@nestjs/common';
import { productsService } from './products.service';
import { AuthGuard } from '../Auth/AuthGuard.guard';
import { ProductDto } from './Dtos/productDto.dto';
import { IsUUID } from 'class-validator';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { ImageUploadPipe } from 'src/pipes/image-upload/image-upload.pipe';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Admin } from 'typeorm';
import { Role } from '../Users/enum/role.enum';
import { UpdateProductDto } from './Dtos/updateProductDto.dto';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class productsController {
  constructor(
    private readonly productServic: productsService,
    private readonly fileUploadService: FileUploadService,
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
  postProducts(@Body() product: ProductDto) {
    return this.productServic.createProduct(product);
  }

  // @Post('files/uploadImage/:id')
  // @UseInterceptors(FileInterceptor("image"))
  // postProductImages(@UploadedFile() file : Express.Multer.File){
  //   return this.cloudinaryService.uploadImage(file)
  // }

  @UseGuards(AuthGuard, RolesGuard)
  @Post(':id/upload')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema:{
      type: "object",
      properties:{
        file:{
          type: "string",
          format: "binary"
        }
      }
    }
  })
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile(new ImageUploadPipe()) file: Express.Multer.File,
  ) {
    console.log('En product controller', id, file.size);

    return await this.productServic.uploadFile(file, id);
  }

  @UseGuards(AuthGuard)
  @Get(':id/image')
  @HttpCode(200)
  async getImage(@Param('id') id: string) {
    return this.fileUploadService.getUrl(id);
  }
  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async putProductById(@Param("id") id: string, @Body() updateProductDto : UpdateProductDto
  ): Promise<any> {
    const productActualizado = await this.productServic.updateProduct(id, updateProductDto);
    if (!productActualizado) {
      throw new NotFoundException('Producto no encontrado');
    }
    return productActualizado;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUsersById(@Param('id') id: string): any {
    return this.productServic.remove(id);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getProductsById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productServic.getProductById(id);
    if (!IsUUID(4, { each: true })) {
      throw new HttpException('UUID Invalida', HttpStatus.BAD_REQUEST);
    }

    if (!product) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }

    return product;
  }
}
