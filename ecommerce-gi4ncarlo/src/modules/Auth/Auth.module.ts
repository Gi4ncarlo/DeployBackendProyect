/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { authController } from './Auth.controller';
import { authService } from './Auth.service';

@Module({
 // imports: [],
  controllers: [authController],
  providers: [authService ],
})
export class AuthModule {}