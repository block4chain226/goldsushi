import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StorageService } from '../storage/storage.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { raw } from 'express';
import { async, never } from 'rxjs';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: Repository<Category>;
  let storageService: StorageService;
  let configService: ConfigService;

  const categoryResponce = {
    id: '17e3d5c3-e467-47fe-b3ef-2d546f39087e',
    title: 'fake6',
    parent_id: '12668bea-89e1-4b71-9599-f46cb09a4dc6',
    url: 'https://storage.googleapis.com/retouchbucket/photo_2024-01-31.11.33.38.jpeg',
  } as unknown as Category;

  const categoryDto = {
    title: 'fake6',
    parent_id: '12668bea-89e1-4b71-9599-f46cb09a4dc6',
    url: 'https://storage.googleapis.com/retouchbucket/photo_2024-01-31.11.33.38.jpeg',
  } as unknown as CreateCategoryDto;

  const image = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [
        CategoryService,
        StorageService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            update: jest.fn(),
            findOne: jest.fn(),
            uploadFile: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            replaceAll: jest.fn((x) => x),
          },
        },
        // {
        //   provide: StorageService,
        //   useValue: {
        //     uploadFile: jest.fn(),
        //   },
        // },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    storageService = module.get<StorageService>(StorageService);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  it('should return created category', async () => {
    jest.spyOn(storageService, 'uploadFile').mockResolvedValue('');
    jest
      .spyOn(categoryService, 'create')
      .mockImplementationOnce(async () => categoryResponce);
    expect(await categoryService.create(categoryDto, image)).toEqual({
      id: '17e3d5c3-e467-47fe-b3ef-2d546f39087e',
      title: 'fake6',
      parent_id: '12668bea-89e1-4b71-9599-f46cb09a4dc6',
      url: 'https://storage.googleapis.com/retouchbucket/photo_2024-01-31.11.33.38.jpeg',
    });
  });

  it('should update category url', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue({
      id: 'dsvvs',
      title: 'sdvdsvd',
      url: 'dfvfdvfdv',
      parentID: 'sdvfv',
    } as unknown as Category);
    jest.spyOn(categoryService, 'update').mockResolvedValue('ret');
    const res = await categoryService.update(
      '0',
      { url: 'sdvsdv', title: 'dsvsdv', parentId: 'dfdsv' },
      { path: 'path', originalName: 'vasa' },
    );
    console.log('=>(category.service.spec.ts:85) res', res);
  });
});
