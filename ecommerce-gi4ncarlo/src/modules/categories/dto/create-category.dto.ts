import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, IsOptional, IsArray } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        type: String,
        description: "Name of the category",
        example: "Electronics",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    name: string;

    @ApiProperty({
        type: [String],
        description: "List of product IDs associated with the category",
        example: ["2d3a89a4-b9e2-4f68-8e3d-0cb292b67d34"],
        required: false,
    })
    @IsOptional()
    @IsArray()
    products?: string[]; 
}
