import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      dest: path.join(__dirname, '../../src/storage/files/'),
      limits: {
        files: 1,
        // fileSize: 1024 * 1024,
      },
    }),
  )
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(typeof image);
    return <Category>(
      await this.categoryService.create(createCategoryDto, image)
    );
  }

  @Get()
  async findAll() {
    return <Category[] | Category>await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return <Category>await this.categoryService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      dest: path.join(__dirname, '../../src/storage/files/'),
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.categoryService.update(id, updateCategoryDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
