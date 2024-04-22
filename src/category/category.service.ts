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
        (image.originalname = image.originalname.replaceAll(' ', '.')),
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
  // TODO do all db operations in transactions
  async findOne(id: string): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  //get category, update img to cloud update img to db then delete img in cloud
  async update(id: string, updateCategoryDto: UpdateCategoryDto, image) {
    let isUrlUpdated: boolean = false;
    let oldUrl: string;
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category.id)
      throw new InternalServerErrorException('can`t update category');
    if (image) {
      oldUrl = category.url;
      updateCategoryDto.url = await this.storageService.uploadFile(
        image.path,
        (image.originalname = image.originalname.replaceAll(' ', '.')),
      );
      if (updateCategoryDto.url !== oldUrl) {
        isUrlUpdated = true;
      }
    }
    const updated = await this.categoryRepository.update(
      { id: id },
      updateCategoryDto,
    );
    if (updated.affected < 1)
      throw new InternalServerErrorException(`category ${id} was not updated`);
    if (isUrlUpdated) {
      const urlToDelete = this.storageService.parseUrlToPath(oldUrl);
      await this.storageService.delete(urlToDelete);
    }
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    const deleted = await this.categoryRepository.delete({ id: id });
    if (deleted.affected < 1)
      throw new InternalServerErrorException(`category ${id} was not deleted`);
    return `This action removes a #${id} category`;
  }
}
