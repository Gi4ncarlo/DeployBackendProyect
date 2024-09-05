import { Module } from '@nestjs/common';
import { userController } from './users.controller';
import { userService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
 // imports: [],
  controllers: [userController],
  providers: [userService, UsersRepository],
})
export class UsersModule {}