import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
export class signUpUserDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name : string; 

    @IsNotEmpty()
    @IsEmail()
    email : string;


    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/,
        {
            message : 
            "La contraseña debe contener una minuscula, una mayuscula, un numero, un simbolo"
        }
    )
    @IsNotEmpty()
    @IsString()
    password : string;

    @IsNotEmpty()
    @IsString()
    passwordConfirm : string;

    @IsNotEmpty()
    @IsString()
    phone : string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    country : string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    address : string ; 

    @IsString()
    @Length(5, 20)
    city : string;

    orders_id? : string;

    constructor(partial: Partial<signUpUserDto> ){{
        Object.assign(this, partial)
    }}

}