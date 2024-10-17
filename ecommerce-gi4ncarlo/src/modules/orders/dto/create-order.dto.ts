import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export interface ProductId {
    id: string;
}

export class CreateOrderDto {

    @ApiProperty({
        type: String,
        description: "Unique identifier for the user placing the order",
        example: "eebf07e1-0987-4c8e-b6b2-d327888f2e67", // Example UUID
    })
    @IsString()
    @IsUUID()
    userId: string;

    @ApiProperty({
        type: Array,
        description: "List of product IDs included in the order",
        required: true,
        example: [{ id: "2d3a89a4-b9e2-4f68-8e3d-0cb292b67d34" }], // Example product IDs
    })
    @IsArray()
    @IsNotEmpty()
    products: Array<ProductId>;
}
