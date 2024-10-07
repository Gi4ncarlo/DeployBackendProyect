import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInUserDto {
    
    @ApiProperty({
        type: String,
        description: "Email of user",
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        description: "Password of user",
        required: true,
    })
    @IsNotEmpty()
    password: string;

    constructor(partial: Partial<SignInUserDto>) {
        Object.assign(this, partial);
    }
}
