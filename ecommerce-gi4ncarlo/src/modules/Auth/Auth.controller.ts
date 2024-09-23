/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post } from "@nestjs/common";
import { authService }  from "./Auth.service"
import { RegisterUserDto } from "../Users/Dtos/RegisterUserDto.dto";

@Controller("auth")
export class authController {
    constructor(private readonly authServic : authService) {}

    // @Get()
    // getAuths() : string {
    //     return this.authServic.getAuths();
    // }

    @Post("/signin")
    loginAuth(@Body() userSignIn : RegisterUserDto ): any{
      
        return this.authServic.signIn(userSignIn);
    }
    
}