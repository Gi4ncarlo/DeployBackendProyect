import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './Dtos/updateUserDto.dto';
import { AuthGuard } from '../Auth/AuthGuard.guard';
import { IsUUID } from 'class-validator';
import { authService } from '../Auth/Auth.service';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './enum/role.enum';
import { User } from './user.entity';


@ApiBearerAuth()
@ApiTags("users")
@ApiExtraModels(User)
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
  @Roles(Role.Admin)
  async getUsers() {
  return this.userService.getAllUsers(); 
}

  // @Post("signup") COMENTADO PORQUE CREE EL METODO SIGNUP EN EL CONTROLADOR DE AUTH
  // async signUp(@Body() loginUser: createUserDto) {
  //   return this.authService.signUp(loginUser)
  // }

  @UseGuards(AuthGuard)
  @Put(':id')
  @HttpCode(200)
  async putUsersById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const userActualizado = await this.userService.updateUser(id, updateUserDto);
    if (!userActualizado) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return userActualizado;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUsersById(@Param('id') id: string): any {
    return this.userService.deleteUserById(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get(':id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
   
    if(!IsUUID(4, { each : true})){
      throw new HttpException("UUID Invalida", HttpStatus.BAD_REQUEST)
    }

    const user = await this.userService.findOneById(id);

    if(!user){
      throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND)
    }

    return user
  }

}
