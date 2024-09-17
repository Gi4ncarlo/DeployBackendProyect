
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './Dtos/updateUserDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createUserDto } from './Dtos/createUserDto.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}

      async getUsers(page: number, limit: number) {
        const skip = (page - 1) * limit; 

        return await this.userRepository.find({
            take : limit,
            skip : skip,
        })
    }

    async createUser(user: createUserDto): Promise <{name : string}> { //DEBE RETORNAR EL ID DEL USER CREADO ? 
        
        user.createdAt =  new Date().toString();
        await this.userRepository.save(user)

        return {name : user.name};
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
      // Encuentra el usuario
      const user = await this.userRepository.findOneBy({ id });
     
      // Verifica si el usuario existe
      if (!user) {
          throw new Error("Usuario no encontrado");
      }
      
      // Actualiza el usuario
      await this.userRepository.update(id, updateUserDto);
      
      // Obtiene el usuario actualizado
      return await this.userRepository.findOneBy({ id });
  }
  

   async findOneBy(userId: string): Promise<User> {
        return await this.userRepository.findOneBy({ id: (userId) });
      }

   async deleteUserById(id: string): Promise <{id : string}> {
      await this.userRepository.delete(id)
        return {id}
    }

}