import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class createUserDto {

    @ApiProperty({
        type: String,
        description: "Name of the user",
        required: true,
        minLength: 3,
        maxLength: 80,
        example: "John Doe", // Example name
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;

    @ApiProperty({
        type: String,
        description: "Email of the user",
        required: true,
        example: "johndoe@example.com", // Example email
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        description: "Password of the user",
        required: true,
        example: "P@ssw0rd123", // Example password
    })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/,
        {
            message: 
            "La contraseña debe contener una minuscula, una mayuscula, un numero, un simbolo"
        }
    )
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        type: String,
        description: "Password confirmation of the user",
        required: true,
        example: "P@ssw0rd123", // Example password confirmation
    })
    @IsNotEmpty()
    @IsString()
    passwordConfirm: string;

    @ApiProperty({
        type: String,
        description: "Phone number of the user",
        required: true,
        example: "+1234567890", // Example phone number
    })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({
        type: String,
        description: "Country of the user",
        required: true,
        minLength: 5,
        maxLength: 20,
        example: "USA", // Example country
    })
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    country: string;

    @ApiProperty({
        type: String,
        description: "Address of the user",
        required: true,
        minLength: 3,
        maxLength: 80,
        example: "123 Main St", // Example address
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    address: string;

    @ApiProperty({
        type: String,
        description: "City of the user",
        required: false,
        minLength: 5,
        maxLength: 20,
        example: "New York", // Example city
    })
    @IsString()
    @Length(5, 20)
    city: string;

    orders_id?: string; // This field can be documented if necessary
}
