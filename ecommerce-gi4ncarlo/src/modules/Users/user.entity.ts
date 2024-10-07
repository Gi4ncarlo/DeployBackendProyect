import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../orders/entities/order.entity";
import { Role } from "./enum/role.enum";

@Entity({
    name: "users",
})
export class User {
    
    @ApiProperty({
        type: String,
        description: "Unique identifier for the user",
        example: "eebf07e1-0987-4c8e-b6b2-d327888f2e67", // Example UUID
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        type: String,
        description: "Name of the user",
        example: "John Doe", // Example name
    })
    @Column()
    name: string;

    @ApiProperty({
        type: String,
        description: "Email of the user (must be unique)",
        example: "johndoe@example.com", // Example email
    })
    @Column({ unique: true })
    email: string;

    @ApiProperty({
        type: String,
        description: "Password of the user",
        example: "P@ssw0rd123", // Example password
    })
    @Column()
    password: string;

    @ApiProperty({
        type: String,
        description: "Phone number of the user",
        example: "+1234567890", // Example phone number
    })
    @Column()
    phone: string;

    @ApiProperty({
        type: String,
        description: "Country of the user",
        example: "USA", // Example country
        required: false,
    })
    @Column({ nullable: true })
    country: string;

    @ApiProperty({
        type: String,
        description: "Address of the user",
        example: "123 Main St", // Example address
    })
    @Column()
    address: string;

    @ApiProperty({
        type: String,
        description: "City of the user",
        example: "New York", // Example city
        required: false,
    })
    @Column({ nullable: true })
    city: string;

    @ApiProperty({
        type: () => [Order],
        description: "List of orders associated with the user",
    })
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @ApiProperty({
        type: String,
        description: "Role of the user",
        example: "User", // Example role
    })
    @Column()
    administrador: string = Role.User; // Use enum value if needed
}
