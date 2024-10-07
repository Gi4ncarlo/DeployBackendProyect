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
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './Dtos/updateUserDto.dto';
import { AuthGuard } from '../Auth/AuthGuard.guard';
import { createUserDto } from './Dtos/createUserDto.dto';
import { IsUUID } from 'class-validator';
import { authService } from '../Auth/Auth.service';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('users')
export class userController {
  constructor(private readonly userService: UserService,
    private readonly authService : authService
  ){}

//   @Get()
//   @UseGuards(AuthGuard, RolesGuard)
//   async getUsers(
//     @Query('page') page: number = 1,
//     @Query('limit') limit: number = 10
// ) {
//   return this.userService.getUsers(page, limit); 
// }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  async getUsers() {
  return this.userService.getAllUsers(); 
}

  @Post("signup")
  async signUp(@Body() loginUser: createUserDto) {
    return this.authService.signUp(loginUser)
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  putUsersById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): any {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUsersById(@Param('id') id: string): any {
    return this.userService.deleteUserById(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOneById(id);
    if(!IsUUID(4, { each : true})){
      throw new HttpException("UUID Invalida", HttpStatus.BAD_REQUEST)
    }
    if(!user){
      throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND)
    }
    return user
  }

}
