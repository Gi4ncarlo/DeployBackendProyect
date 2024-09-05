import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';
import { UpdateUserDto } from './Dtos/updateUserDto.dto';

@Injectable()
export class userService {

    constructor (private userRepository : UsersRepository){}
    getUsers(page: number, limit: number) {
        return this.userRepository.getUsers(page, limit);
    }

    getUserById(id: number) {
        return this.userRepository.getById(id);
    }

    createUser(user: Omit <User, "id">): Promise <{id : number}> {
        return this.userRepository.createUser(user)
    }

    updateUser(id: number, updateUserDto: UpdateUserDto) : Promise <number> {
        const user = this.userRepository.getById(id);
       
        if(!user){
            console.log("Usuario no encontrado")
        }

        return this.userRepository.update(id, updateUserDto)

    }

    deleteUserById(id: number): Promise <number> {
        return this.userRepository.deleteUserById(id)
    }
}