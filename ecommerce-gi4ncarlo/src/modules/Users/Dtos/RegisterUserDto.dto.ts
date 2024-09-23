import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    @IsString()
    password : string;

    @IsNotEmpty()
    @IsString()
    confirmPassword : string;
}