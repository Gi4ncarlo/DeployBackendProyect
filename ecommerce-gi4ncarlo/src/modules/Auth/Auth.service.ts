/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../Users/users.repository';

@Injectable()
export class authService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAuths(): string {
    return 'Get Auths';
  }

  async loginAuth(email: string, password: string): Promise<any> {
    
    let mensaje = "Ingreso exitoso!"

    if (!email || !password) {
      mensaje ='Email o password incorrectos';
    }

   if(!this.usersRepository.validateCredencials(email, password)){
        mensaje ='Email o password incorrectos';
   }

    return mensaje;

  }
}
