import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInUserDto {
    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    password : string;

    constructor(partial: Partial<SignInUserDto> ){{
        Object.assign(this, partial)
    }}
}