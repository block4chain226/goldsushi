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
import { SharpPipe } from '../pipes/sharp.pipe';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile(SharpPipe) image: string,
  ) {
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
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile(SharpPipe) image: string,
  ) {
    return this.categoryService.update(id, updateCategoryDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
