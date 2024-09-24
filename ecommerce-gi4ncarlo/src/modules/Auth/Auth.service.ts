/* eslint-disable prettier/prettier */

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../Users/users.service';
import { User } from '../Users/user.entity';
import * as bcrypt from 'bcrypt';
import { signUpUserDto } from '../Users/Dtos/SignUpUserDto.dto';
import { SignInUserDto } from '../Users/Dtos/SignInUserDto.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class authService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpUser: signUpUserDto) {
    const userFinded = await this.usersService.findUserByEmail(
      signUpUser.email,
    );

    if (userFinded) {
      throw new BadRequestException('El usuario ya existe.');
    }

    if (signUpUser.password !== signUpUser.passwordConfirm) {
      throw new HttpException('Las contraseñas no coinciden.', 400);
    }

    signUpUser.password = await bcrypt.hash(signUpUser.password, 10);

    if (!signUpUser.password) {
      throw new BadRequestException('Error en el hasheo de la password');
    }

    const newUser = await this.usersService.createUser(signUpUser);
    return newUser;
  }

  async signIn(credentials: SignInUserDto): Promise<any> {
    const user = await this.usersService.findUserByEmail(credentials.email);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordMatching = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.createToken(user);

    return { token };
  }

  private async createToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return this.jwtService.signAsync(payload);
  }
}
