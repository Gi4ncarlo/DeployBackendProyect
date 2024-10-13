
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

    async getAllUsers(){
        return await this.userRepository.find();
    }
    
    async createUser(user: createUserDto): Promise <User> { //DEBE RETORNAR EL ID DEL USER CREADO ? 
        
        const newUser = await this.userRepository.create(user)
      
        return await this.userRepository.save(newUser)
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
        // Encuentra el usuario
        const user = await this.userRepository.findOneBy({ id });
       
        // Verifica si el usuario existe
        if (!user) {
            return null; // Retorna null si el usuario no se encuentra
        }
    
        // Actualiza el usuario
        await this.userRepository.update(id, updateUserDto);
        
        // Obtiene el usuario actualizado
        return await this.userRepository.findOneBy({ id });
    }
  

    async findOneById(userId: string): Promise<Partial<User>> {
      return await this.userRepository.findOne({
        where: { id: userId },
        relations: ['orders'], // Incluye las órdenes relacionadas
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          country: true,
          address: true,
          city: true,
          orders: {
            id: true,
            date: true, 
          },
        },
      });
    }
    
    async findUserByEmail(email : string) : Promise<User> {
        return await this.userRepository.findOne({
            where : {email}
        })
    }

   async deleteUserById(id: string): Promise <{id : string}> {
      await this.userRepository.delete(id)
        return {id}
    }

}