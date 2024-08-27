/* eslint-disable prettier/prettier */

import { Controller, Get } from "@nestjs/common";
import { authService }  from "./Auth.service"

@Controller("auth")
export class authController {
    constructor(private readonly authServic : authService) {}

    @Get()
    getAuths() : string {
        return this.authServic.getAuths();
    }
}