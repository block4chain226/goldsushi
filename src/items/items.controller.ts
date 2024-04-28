import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemResponseDto } from './dto/item-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from '../pipes/sharp.pipe';
import { ContextInterceptor } from '../interceptors/context.interceptor';
import { AddUrlPipe } from '../pipes/addUrl.pipe';
import { Request } from 'express';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('create')
  @UseInterceptors(ContextInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  async createItem(
    @Body(AddUrlPipe) createItemDto: CreateItemDto,
    @UploadedFile(SharpPipe) image: string,
    @Req() req: Request,
  ): Promise<ItemResponseDto> {
    return this.itemsService.createItem(
      createItemDto,
      image,
      req.body['handler'],
    );
  }

  @Patch(':id')
  @UseInterceptors(ContextInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  async updateItem(
    @Param('id') id: string,
    @Body(AddUrlPipe) updateItemDto: UpdateItemDto,
    @UploadedFile(SharpPipe) image: string,
    @Req() req: Request,
  ): Promise<string> {
    return this.itemsService.updateItem(
      id,
      updateItemDto,
      image,
      req.body['handler'],
    );
  }

  @Delete(':id')
  @UseInterceptors(ContextInterceptor)
  async deleteItem(@Param('id') id: string) {
    return this.itemsService.deleteItem(id);
  }

  @Get()
  async getAllItems(): Promise<ItemResponseDto[]> {
    return this.itemsService.getAllItems();
  }

  @Get(':id')
  async getItemById(@Param('id') id: string): Promise<ItemResponseDto> {
    return this.itemsService.getItemById(id);
  }
}
