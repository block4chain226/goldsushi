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

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
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
    if (!updated)
      throw new InternalServerErrorException(`category ${id} was not updated`);
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    const deleted = await this.categoryRepository.delete({ id: id });
    if (!deleted)
      throw new InternalServerErrorException(`category ${id} was not deleted`);
    return `This action removes a #${id} category`;
  }
}