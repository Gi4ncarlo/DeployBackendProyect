import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { NotFoundException } from '@nestjs/common';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: Repository<Category>;

  const mockCategoryRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: 'Electronics',
      products: [],
    };
    mockCategoryRepository.save.mockResolvedValue(createCategoryDto);

    const result = await service.create(createCategoryDto);

    expect(repository.create).toHaveBeenCalledWith(createCategoryDto);
    expect(result).toEqual(createCategoryDto);
  });

  it('should return all categories', async () => {
    const result = [{ id: '550e8400-e29b-41d4-a716-446655440001', name: 'Electronics', products: [] }];
    mockCategoryRepository.find.mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  it('should return a category by ID', async () => {
    const result = { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Electronics', products: [] };
    mockCategoryRepository.findOneBy.mockResolvedValue(result);

    expect(await service.findOne('550e8400-e29b-41d4-a716-446655440001')).toBe(result);
  });

  it('should throw NotFoundException if category not found', async () => {
    mockCategoryRepository.findOneBy.mockResolvedValue(null);

    await expect(service.findOne('non-existing-id')).rejects.toThrow(NotFoundException);
  });

  it('should remove a category', async () => {
    const existingCategory = { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Electronics', products: [] };
    mockCategoryRepository.findOneBy.mockResolvedValue(existingCategory);
    mockCategoryRepository.remove.mockResolvedValue(undefined);

    const result = await service.remove('550e8400-e29b-41d4-a716-446655440001');

    expect(result).toEqual({ message: `Category with ID 550e8400-e29b-41d4-a716-446655440001 has been removed` });
  });
});
