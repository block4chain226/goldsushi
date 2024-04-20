import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private storageService: StorageService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, image): Promise<Category> {
    if (image) {
      createCategoryDto.url = await this.storageService.uploadFile(
        image.path,
        image.originalname,
      );
    }
    const newCategory = new Category(createCategoryDto);
    await this.categoryRepository.save(newCategory);
    if (!newCategory.id)
      throw new BadRequestException('category was not created');
    return newCategory;
  }

  async findAll(): Promise<Category[] | Category> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updated = await this.categoryRepository.update(
      { id: id },
      updateCategoryDto,
    );
    if (updated.affected < 1)
      throw new InternalServerErrorException(`category ${id} was not updated`);
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    const deleted = await this.categoryRepository.delete({ id: id });
    if (deleted.affected < 1)
      throw new InternalServerErrorException(`category ${id} was not deleted`);
    return `This action removes a #${id} category`;
  }
}
