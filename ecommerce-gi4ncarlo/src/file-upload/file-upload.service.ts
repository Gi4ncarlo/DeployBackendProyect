import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/modules/Products/cloudinary.service';
import { UploadFileDto } from './dtos/UploadFile.dto';

@Injectable()
export class FileUploadService {

    constructor(private readonly cloudinaryService : CloudinaryService) {}

    async uploadFile(file : UploadFileDto){

        console.log("Dentro de uploadFile FileUpload");
        
        return await this.cloudinaryService.uploadFile(file.buffer, file.originalname)
    }

    async getUrl(publicId : string){
        return this.cloudinaryService.getUrl(publicId)
    }
}
