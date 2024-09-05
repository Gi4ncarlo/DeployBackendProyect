import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { UpdateUserDto } from './Dtos/updateUserDto.dto';

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main St, Apt 4B',
      phone: '+1-202-555-0143',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'securePass456',
      address: '456 Oak Dr, Suite 300',
      phone: '+44-20-7946-0958',
      country: 'UK',
      city: 'London',
    },
    {
      id: 3,
      email: 'peter.parker@example.com',
      name: 'Peter Parker',
      password: 'sp1derM@n',
      address: '789 Broadway, Unit 8A',
      phone: '+1-212-555-0192',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 4,
      email: 'maria.garcia@example.com',
      name: 'Maria Garcia',
      password: 'passw0rd789',
      address: '101 Maple St, Floor 2',
      phone: '+34-91-555-8392',
      country: 'Spain',
      city: 'Madrid',
    },
    {
      id: 5,
      email: 'li.wang@example.com',
      name: 'Li Wang',
      password: 'P@ssword321',
      address: '202 Elm St, Apt 12',
      phone: '+86-10-5558-3294',
      country: 'China',
      city: 'Beijing',
    },
  ];

  async getUsers(
    page: number = 1,
    limit: number = 5,
  ): Promise<Omit<UpdateUserDto, 'password'>[]> {
    const offset = (page - 1) * limit;
    const paginatedUsers = this.users
      .slice(offset, offset + limit)
      .map(({ password, ...rest }) => rest);
    return paginatedUsers;
  }

  async getById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  async createUser(user: Omit<User, 'id'>) {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return { id };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<number> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      console.log(`User with ID ${id} not found`);
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };
    console.log('dentro de update repository ', userIndex);
    return id;
  }

  validateCredencials(email: string, password: string) {

    console.log("Dentro de credencials : email ", email);
    console.log("Dentro de credencials : password ", password);
    

    const usuario = this.users.find((user) => user.email === email);
    
    if (usuario && usuario.password === password) {
      return true; 
  }

    return false;
  }



  async deleteUserById(id: number): Promise<number> {
    this.users = this.users.filter((user) => user.id !== id);
    return id;
  }
}
