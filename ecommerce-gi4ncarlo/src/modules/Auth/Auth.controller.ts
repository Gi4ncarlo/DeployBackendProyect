/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post } from "@nestjs/common";
import { authService }  from "./Auth.service"

@Controller("auth")
export class authController {
    constructor(private readonly authServic : authService) {}

    @Get()
    getAuths() : string {
        return this.authServic.getAuths();
    }

    @Post("/signin")
    loginAuth(@Body() body : {email : string, password : string} ): any{
        const { email, password } = body;
        return this.authServic.loginAuth(email, password);
    }
    
}