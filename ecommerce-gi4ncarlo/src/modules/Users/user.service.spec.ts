import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './Dtos/createUserDto.dto';
import { UpdateUserDto } from './Dtos/updateUserDto.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUser = {
    id: '1234fs-1234fs-1234fs-1234fs',
    name: 'Test User',
    email: 'test@example.com',
    phone: '123456789',
    address: 'Fake Street 123',
    city: 'Test City',
    country: 'Test Country',
  };

  const mockUserRepository = {
    find: jest.fn().mockResolvedValue([mockUser]),
    create: jest.fn().mockReturnValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    findOneBy: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getUsers() should return an array of users', async () => {
    const result = await service.getUsers(1, 10);
    expect(result).toEqual([mockUser]);
    expect(repository.find).toHaveBeenCalledWith({ take: 10, skip: 0 });
  });

  it('createUser() should create and return a new user', async () => {
    const createUserDto: createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123456789',
      address: 'Fake Street 123',
      city: 'Test City',
      country: 'Test Country',
      password: "Fakepassword",
      passwordConfirm: "Fakepassword"
    };

    const result = await service.createUser(createUserDto);
    expect(repository.create).toHaveBeenCalledWith(createUserDto);
    expect(repository.save).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });


  it('updateUser() should update a user if it exists', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'Updated Name',
      email: 'updated@example.com',
    };

    const result = await service.updateUser('1234fs-1234fs-1234fs-1234fs', updateUserDto);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1234fs-1234fs-1234fs-1234fs' });
    expect(repository.update).toHaveBeenCalledWith('1234fs-1234fs-1234fs-1234fs', updateUserDto);
    expect(result).toEqual(mockUser);
  });

  it('deleteUserById() should delete a user by ID and return the ID', async () => {
    const result = await service.deleteUserById('1234fs-1234fs-1234fs-1234fs');
    expect(repository.delete).toHaveBeenCalledWith('1234fs-1234fs-1234fs-1234fs');
    expect(result).toEqual({ id: '1234fs-1234fs-1234fs-1234fs' });
  });
});
