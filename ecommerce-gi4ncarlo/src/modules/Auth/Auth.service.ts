/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

@Injectable()
export class authService {
    getAuths() : string {
        return "Get Auths"
    }
}