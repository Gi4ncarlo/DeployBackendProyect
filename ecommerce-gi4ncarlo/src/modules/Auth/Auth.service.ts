/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../Users/users.service';
import { User } from '../Users/user.entity';
import { RegisterUserDto } from '../Users/Dtos/RegisterUserDto.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class authService {
  constructor(private readonly usersService: UserService) {}

  async signUp(user :  Omit<User , "id">)  {
    const userFinded = await this.usersService.findUserByEmail(user.email);

    if (userFinded) {
      throw new BadRequestException('El usuario ya existe.');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    if(!hashedPassword){
      throw new BadRequestException("Error en el hasheo de la password");
    }

    this.usersService.createUser({...user, password : hashedPassword})
    return { success : "User creado correctamente!"}
  }

  async signIn(user: RegisterUserDto): Promise<any> {
    const { email, password, confirmPassword } = user;
    let mensaje = 'Ingreso exitoso!';

    if (!email || !password) {
      mensaje = 'Email o password incorrectos';
    }

    if (password !== confirmPassword) {
      mensaje = 'Las contraseñas no coinciden.';
    }

    if (!this.usersService.findUserByEmail(email)) {
      throw new BadRequestException('Datos invalidos, usuario no Encontrado');
    }
    return mensaje;
  }
}
