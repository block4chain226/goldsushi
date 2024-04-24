import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemResponseDto } from './dto/item-response.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Post('create')
  async createItem(
    @Body() createItemDto: CreateItemDto,
  ): Promise<ItemResponseDto> {
    return this.itemsService.createItem(createItemDto);
  }

  @Get()
  async getAllItems(): Promise<ItemResponseDto[]> {
    return this.itemsService.getAllItems();
  }
}
