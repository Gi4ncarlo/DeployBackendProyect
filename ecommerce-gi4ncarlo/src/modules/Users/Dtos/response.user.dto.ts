import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    
    @ApiProperty({
        type: String,
        description: "Unique identifier for the user",
        example: "eebf07e1-0987-4c8e-b6b2-d327888f2e67", // Example UUID
    })
    id: string;

    @ApiProperty({
        type: String,
        description: "Name of the user",
        example: "John Doe", // Example name
    })
    name: string;

    @ApiProperty({
        type: String,
        description: "Email of the user",
        example: "johndoe@example.com", // Example email
    })
    email: string;

    @ApiProperty({
        type: String,
        description: "Address of the user",
        example: "123 Main St", // Example address
    })
    address: string;

    @ApiProperty({
        type: String,
        description: "Phone number of the user",
        example: "+1234567890", // Example phone number
    })
    phone: string;

    @ApiProperty({
        type: String,
        description: "Country of the user",
        example: "USA", // Example country
        required: false,
    })
    country?: string;

    @ApiProperty({
        type: String,
        description: "City of the user",
        example: "New York", // Example city
        required: false,
    })
    city?: string;

    constructor(partial: Partial<UserResponseDto>) {
        const { id, name, email, address, phone, country, city } = partial;
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.country = country;
        this.city = city;
    }
}
