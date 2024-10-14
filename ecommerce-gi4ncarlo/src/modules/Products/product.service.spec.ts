import { Test, TestingModule } from '@nestjs/testing';
import { productsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from 'src/file-upload/file-upload.service';

describe('productsService', () => {
  let service: productsService;
  let repository: Repository<Product>;
  let fileUploadService: FileUploadService;

  const mockProduct = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Test Product',
    price: 100,
    stock: 10,
    imgUrl: 'http://test-url.com',
  };

  const mockFileUploadService = {
    uploadFile: jest.fn().mockResolvedValue('http://test-url.com'),
  };

  const mockProductRepository = {
    find: jest.fn().mockResolvedValue([mockProduct]),
    findOneBy: jest.fn().mockResolvedValue(mockProduct),
    save: jest.fn().mockResolvedValue(mockProduct),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    update: jest.fn().mockResolvedValue(mockProduct),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        productsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: FileUploadService,
          useValue: mockFileUploadService,
        },
      ],
    }).compile();

    service = module.get<productsService>(productsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
    fileUploadService = module.get<FileUploadService>(FileUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getProducts() should return an array of products', async () => {
    const result = await service.getProducts(1, 10);
    expect(result).toEqual([mockProduct]);
    expect(repository.find).toHaveBeenCalledWith({ take: 10, skip: 0 });
  });

  it('getProductById() should return a product by UUID', async () => {
    const result = await service.getProductById('550e8400-e29b-41d4-a716-446655440000');
    expect(result).toEqual(mockProduct);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: '550e8400-e29b-41d4-a716-446655440000' });
  });

  it('createProduct() should create and return a new product', async () => {
    const productDto = { name: 'New Product', price: 200, stock: 5, description: 'New advanced product' };
    const result = await service.createProduct(productDto);
    expect(repository.save).toHaveBeenCalledWith(productDto);
    expect(result).toEqual(mockProduct);
  });

  it('remove() should delete a product by UUID', async () => {
    const result = await service.remove('550e8400-e29b-41d4-a716-446655440000');
    expect(repository.delete).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440000');
    expect(result).toEqual({ id: '550e8400-e29b-41d4-a716-446655440000' });
  });

  it('buyProduct() should decrease stock by 1 if stock is available', async () => {
    const result = await service.buyProduct('550e8400-e29b-41d4-a716-446655440000');
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: '550e8400-e29b-41d4-a716-446655440000' });
    expect(repository.update).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440000', { stock: 9 });
    expect(result).toEqual(mockProduct.price);
  });
});
