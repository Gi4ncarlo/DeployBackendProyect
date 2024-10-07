import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({
        type: String,
        description: "Unique identifier for the category (optional)",
        example: "eebf07e1-0987-4c8e-b6b2-d327888f2e67", // Example UUID
        required: false, // As ID can be generated automatically
    })
    id: string;

    @ApiProperty({
        type: String,
        description: "Name of the category",
        example: "Electronics", // Example category name
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    name: string;

    @ApiProperty({
        type: [Object],
        description: "List of products associated with the category",
        example: [{ id: "2d3a89a4-b9e2-4f68-8e3d-0cb292b67d34", name: "Smartphone" }], // Example product array
        required: false, // Optional field
    })
    products: { id: string; name: string }[];
}
