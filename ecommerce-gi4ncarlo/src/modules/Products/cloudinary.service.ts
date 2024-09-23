import { Injectable } from "@nestjs/common";
import { UploadApiOptions,  v2 as cloudinary} from "cloudinary";
const toStream = require("buffer-to-stream")
import * as dotenv from "dotenv"

@Injectable()
export class CloudinaryService {

    constructor(){
        dotenv.config({
            path : ".env.development"
        })

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
    }
    async uploadFile(buffer : Buffer, originalName?: string ): Promise<string> {
      const options : UploadApiOptions = {
        folder: "uploads",
        public_id: originalName,
        resource_type: "auto"
      }

      return new Promise((resolve, reject) =>{
        const stream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
                error ? reject(error) : resolve(result.secure_url)
            },
        );
        stream.write(buffer);
        stream.end();
    })
    }

    async getUrl (public_id : string) : Promise<string> {
        const result = await cloudinary.api.resource(public_id);
        return result;
    }
}