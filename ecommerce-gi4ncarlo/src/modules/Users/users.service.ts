import { Injectable } from '@nestjs/common';

@Injectable()
export class userService {
    getUsers() : string {
        return "Get Users"
    }
}