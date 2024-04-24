import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/items.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { plainToInstance } from 'class-transformer';
import { ItemResponseDto } from './dto/item-response.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}
  async createItem(createItemDto: CreateItemDto): Promise<ItemResponseDto> {
    const item = new Item(createItemDto);
    const newItem = await this.itemRepository.save(item);
    if (!newItem.id) throw new BadRequestException('item was not created');
    return plainToInstance(ItemResponseDto, newItem);
  }

  async getAllItems(): Promise<ItemResponseDto[]> {
    const items = await this.itemRepository.find();
    return plainToInstance(ItemResponseDto, items);
  }
}
