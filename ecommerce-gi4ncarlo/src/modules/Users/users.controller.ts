import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { userService } from './users.service';
import { User } from './user.interface';
import { UpdateUserDto } from './Dtos/updateUserDto.dto';
import { AuthGuard } from '../Auth/AuthGuard.guard';

@Controller('users')
export class userController {
  constructor(private readonly userServic: userService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5'
) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 5; 
    const users = await this.userServic.getUsers(pageNumber, limitNumber);
    return { data: users };
}

  @Post()
  postUsers(@Body() user: User): any {
    return this.userServic.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  putUsersById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): any {
    return this.userServic.updateUser(Number(id), updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUsersById(@Param('id') id: string): any {
    return this.userServic.deleteUserById(Number(id));
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string): any {
    return this.userServic.getUserById(Number(id));
  }
}
