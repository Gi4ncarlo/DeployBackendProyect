import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CloudinaryService } from 'src/modules/Products/cloudinary.service';

@Module({
  controllers: [],
  providers: [FileUploadService, CloudinaryService],
  exports : [FileUploadService]
})
export class FileUploadModule {}
