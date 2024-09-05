/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { authController } from './Auth.controller';
import { authService } from './Auth.service';
import { UsersRepository } from '../Users/users.repository';

@Module({
 // imports: [],
  controllers: [authController],
  providers: [authService , UsersRepository],
})
export class AuthModule {}