import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailDto {
    
    @ApiProperty({
        type: Number,
        description: "Price of the order detail",
        example: 29.99, // Example price
    })
    price: number;

    @ApiProperty({
        type: Object,
        description: "Order associated with the order detail",
        example: { id: "eebf07e1-0987-4c8e-b6b2-d327888f2e67" }, // Example order object with ID
    })
    order: object;

    @ApiProperty({
        type: [Object],
        description: "List of products associated with the order detail",
        example: [
            { id: "2d3a89a4-b9e2-4f68-8e3d-0cb292b67d34" },
            { id: "3a7b1c2e-f9d1-4a3e-b3e2-11a71fbc7c2e" },
        ], // Example array of product objects with IDs
    })
    products: Array<Object>;
}
