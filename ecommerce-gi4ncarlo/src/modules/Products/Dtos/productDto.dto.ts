import { IsDecimal, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";


export class Productdto {

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    price: number; //string porque isdecimal valida cadenas

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @IsString()
    imgUrl?: string;
}