import { IsNotEmpty, IsString, Length } from "class-validator";
export class CreateCategoryDto {

    id : string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    name : string;

    products: { id: string; name: string }[];


}
