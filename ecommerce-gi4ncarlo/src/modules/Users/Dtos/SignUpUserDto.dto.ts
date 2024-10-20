import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
export class signUpUserDto {

    @ApiProperty({
        type: String,
        description : "Name of user",
        required : true,
        minLength: 3,
        maxLength: 80,
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name : string; 

    @ApiProperty({
        type: String,
        description : "Email of user",
        required : true,
    })
    
    @IsNotEmpty()
    @IsEmail()
    email : string;


    @ApiProperty({
        type: String,
        description : "Password of user",
        required : true,
    })
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

    @ApiProperty({
        type: String,
        description : "Password confirm of user",
        required : true,
    })
    @IsNotEmpty()
    @IsString()
    passwordConfirm : string;

    @ApiProperty({
        type: String,
        description : "Phone number of user",
        required : true,
    })
    @IsNotEmpty()
    @IsString()
    phone : string;


    @ApiProperty({
        type: String,
        description : "Country of user",
        required : true,
    })
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    country : string;

    @ApiProperty({
        type: String,
        description : "Address of user",
        required : true,
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    address : string ; 

    @ApiProperty({
        type: String,
        description : "City of user",
        required : true,
    })
    @IsString()
    @Length(5, 20)
    city : string;


    @ApiProperty({
        type: String,
        description : "Role of the user admin/user/superAdmin",
        required : false,
    })
    @IsString()
    @Length(4, 20)
    administrador? : string;

    orders_id? : string;

    constructor(partial: Partial<signUpUserDto> ){{
        Object.assign(this, partial)
    }}

}