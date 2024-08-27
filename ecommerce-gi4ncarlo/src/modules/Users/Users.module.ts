import { Module } from '@nestjs/common';
import { userController } from './users.controller';
import { userService } from './users.service';

@Module({
 // imports: [],
  controllers: [userController],
  providers: [userService],
})
export class UsersModule {}