import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { InternalServerErrorException } from '@nestjs/common';

describe('CategoryController', () => {
  const createDto: CreateCategoryDto = {
    title: 'sushi',
    parentId: '12668bea-89e1-4b71-9599-f46cb09a4dc6',
  };
  let controller: CategoryController;
  let categoryService: CategoryService;
  const controllerServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn((x) => {
      `This action updates a #${x} category`;
    }),
    delete: jest.fn((x) => {
      `This action removes a #${x} category`;
    }),
  };

  const retValue = {
    title: 'sushi',
    parentId: '12668bea-89e1-4b71-9599-f46cb09a4dc6',
    id: 'new id',
  };

  const updateCategory = <Category | Category[]>[
    {
      title: 'sushi',
      parentId: '12668bea-89e1-4b71-9599-f46cb09a4dc6',
      id: 'new id',
    },
    {
      title: 'sushi1',
      parentId: '12668bea-89e1-4b71-9599-f46cb09a4dc6',
      id: 'new id1',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: controllerServiceMock,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('category controller should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('category service should be defined', () => {
    expect(categoryService).toBeDefined();
  });
  it('should return created category', async () => {
    const m = jest
      .spyOn(categoryService, 'create')
      .mockImplementationOnce(async () => <Category>retValue);
    const result = await controller.create(createDto);
    expect(result).toStrictEqual(retValue);
    m.mockRestore();
  });
  it('should return all categories', async () => {
    jest
      .spyOn(categoryService, 'findAll')
      .mockImplementationOnce(async () => updateCategory);
    const result = await controller.findAll();
    expect(result).toEqual(updateCategory);
  });
  it('should return all error', async () => {
    jest.spyOn(categoryService, 'findAll').mockImplementationOnce(async () => {
      throw new InternalServerErrorException();
    });
    try {
      await controller.findAll();
    } catch (err) {
      console.log('err', err.message);
    }
  });
});
