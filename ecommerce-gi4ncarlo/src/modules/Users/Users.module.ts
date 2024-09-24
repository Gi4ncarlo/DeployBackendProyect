import { Module } from '@nestjs/common';
import { userController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { authService } from '../Auth/Auth.service';
import { SharedModule } from 'src/shared/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedModule],
  controllers: [userController],
  providers: [UserService, authService],
  exports: [UserService]
})
export class UsersModule {}