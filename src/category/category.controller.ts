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
  Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from '../pipes/sharp.pipe';
import { CategoryResponseDto } from './dto/category-response.dto';
import { ContextInterceptor } from '../interceptors/context.interceptor';
import { AddUrlPipe } from '../pipes/addUrl.pipe';
import { Request } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(ContextInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  async createCategory(
    @Body(AddUrlPipe) createCategoryDto: CreateCategoryDto,
    @UploadedFile(SharpPipe) image: string,
    @Req() req: Request,
  ): Promise<CategoryResponseDto> {
    console.log(req.body['handler']);
    return await this.categoryService.createCategory(
      createCategoryDto,
      image,
      req.body['handler'],
    );
  }

  @Get()
  async findAll(): Promise<CategoryResponseDto[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
    return await this.categoryService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(ContextInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  async updateCategory(
    @Param('id') id: string,
    @Body(AddUrlPipe) updateCategoryDto: UpdateCategoryDto,
    @UploadedFile(SharpPipe) image: string,
    @Req() req: Request,
  ): Promise<string> {
    return await this.categoryService.updateCategory(
      id,
      updateCategoryDto,
      image,
      req.body['handler'],
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.categoryService.deleteCategory(id);
  }
}
