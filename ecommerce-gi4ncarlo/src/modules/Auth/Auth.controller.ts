/* eslint-disable prettier/prettier */

import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { authService }  from "./Auth.service"
import { SignInUserDto } from "../Users/Dtos/SignInUserDto.dto";
import { signUpUserDto } from "../Users/Dtos/SignUpUserDto.dto";
import { UserResponseDto } from "../Users/Dtos/response.user.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("auth")
@Controller("auth")
export class authController {
    constructor(private readonly authServic : authService) {}

    // @Get()
    // getAuths() : string {
    //     return this.authServic.getAuths();
    // }

    @Post("/signin")
    loginAuth(@Body() userSignIn : SignInUserDto ): any{
      
        return this.authServic.signIn(userSignIn);
    }

    @Post("/signup")
    @HttpCode(HttpStatus.CREATED)
   async signUp(@Body() signUpUser : signUpUserDto){
        const user = await this.authServic.signUp(signUpUser)
        return new UserResponseDto(user)
    }
    
}