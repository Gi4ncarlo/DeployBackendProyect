import { Controller, Get } from "@nestjs/common";
import { userService }  from "./users.service"

@Controller("users")
export class userController {
    constructor(private readonly userServic : userService) {}

    @Get()
    getUsers() : string {
        return this.userServic.getUsers();
    }
}