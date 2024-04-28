import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DataSource, Repository } from 'typeorm';
import { StorageService } from '../storage/storage.service';
import { CategoryResponseDto } from './dto/category-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private storageService: StorageService,
    @Inject('DATA_SOURCE') private dataSource: DataSource,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    image: string,
    catalog: string,
  ): Promise<CategoryResponseDto> {
    if (image) {
      createCategoryDto.url = await this.storageService.uploadFile(
        createCategoryDto.url + image,
        catalog.toLowerCase() + '/' + image.replaceAll(' ', '.'),
      );
    }
    const newCategory = new Category(createCategoryDto);
    await this.categoryRepository.save(newCategory);
    if (!newCategory.id)
      throw new BadRequestException('category was not created');
    return newCategory;
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryRepository.find();
    return plainToInstance(CategoryResponseDto, categories);
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  //get category, update img to cloud update img to db then delete img in cloud
  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    image,
    catalog: string,
  ): Promise<string> {
    let isUrlUpdated: boolean = false;
    let oldUrl: string;
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category.id)
      throw new InternalServerErrorException('can`t update category');
    if (image) {
      oldUrl = category.url;
      updateCategoryDto.url = await this.storageService.uploadFile(
        updateCategoryDto.url + image,
        catalog.toLowerCase() + '/' + image.replaceAll(' ', '.'),
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

  async deleteCategory(id: string): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const repository = queryRunner.manager.getRepository(Category);
    await queryRunner.startTransaction();
    const category = await repository.findOneBy({ id });
    if (!category)
      throw new BadRequestException('category to delete does not exist');
    const deleted = await repository.delete({ id });
    if (deleted.affected < 1) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(`category ${id} was not deleted`);
    }
    const urlToDelete = this.storageService.parseUrlToPath(category.url);
    await this.storageService.delete(urlToDelete).catch(async (err) => {
      await queryRunner.rollbackTransaction();
      console.log(err.message);
      throw new InternalServerErrorException(
        'category was not deleted: problem with cloud storage',
      );
    });
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return `Category #${id} was deleted`;
  }
}
