/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { authController } from './Auth.controller';
import { authService } from './Auth.service';
import { UsersModule } from '../Users/Users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Users/user.entity';
import { SharedModule } from 'src/shared/shared/shared.module';
import { UserService } from '../Users/users.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User]), SharedModule],
  controllers: [authController],
  providers: [authService, UserService],
})
export class AuthModule {}