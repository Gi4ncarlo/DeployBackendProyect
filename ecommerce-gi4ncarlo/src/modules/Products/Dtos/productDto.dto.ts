import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class ProductDto {
    
    @ApiProperty({
        type: String,
        description: "Name of the product",
        required: true,
        maxLength: 50,
        example: "Shampoo",
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    name: string;

    @ApiProperty({
        type: String,
        description: "Description of the product",
        required: true,
        example: "A high-quality hair shampoo that nourishes the scalp.",
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: Number,
        description: "Price of the product in decimal format",
        required: true,
        example: 19.99,
    })
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    price: number; //string porque isDecimal valida cadenas

    @ApiProperty({
        type: Number,
        description: "Stock available for the product",
        required: true,
        example: 100,
    })
    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @ApiProperty({
        type: String,
        description: "Image URL of the product",
        required: false,
        example: "http://example.com/image.jpg",
    })
    @IsString()
    imgUrl?: string;
}
