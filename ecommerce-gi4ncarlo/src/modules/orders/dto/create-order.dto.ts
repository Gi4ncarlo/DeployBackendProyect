import { IS_LENGTH, IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export interface ProductId{
    id : string
}

export class CreateOrderDto {

    @IsString()
    @IsUUID()
    userId : string;

    @IsArray()
    @IsNotEmpty()
    products : Array<ProductId>;
}
