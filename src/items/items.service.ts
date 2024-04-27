import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/items.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { plainToInstance } from 'class-transformer';
import { ItemResponseDto } from './dto/item-response.dto';
import { StorageService } from '../storage/storage.service';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    private storageService: StorageService,
  ) {}
  // TODO cant get access to config file from sharp to save category and item images in diff folders
  async createItem(
    createItemDto: CreateItemDto,
    image: string,
    catalog: string,
  ): Promise<ItemResponseDto> {
    if (image) {
      createItemDto.url = await this.storageService.uploadFile(
        createItemDto.url + image,
        catalog.toLowerCase() + '/' + image.replaceAll(' ', '.'),
      );
      const item = new Item(createItemDto);
      const newItem = await this.itemRepository.save(item);
      if (!newItem.id) throw new BadRequestException('item was not created');
      return plainToInstance(ItemResponseDto, newItem);
    }
    const item = new Item(createItemDto);
    const newItem = await this.itemRepository.save(item);
    if (!newItem.id) throw new BadRequestException('item was not created');
    return plainToInstance(ItemResponseDto, newItem);
  }

  async updateItem(
    id: string,
    updateItemDto: UpdateItemDto,
    image,
    catalog: string,
  ): Promise<string> {
    let isUrlUpdated: boolean = false;
    let oldUrl: string;
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item.id) throw new InternalServerErrorException('can`t update item');
    if (image) {
      oldUrl = item.url;
      updateItemDto.url = await this.storageService.uploadFile(
        updateItemDto.url + image,
        catalog.toLowerCase() + '/' + image.replaceAll(' ', '.'),
      );
      if (updateItemDto.url !== oldUrl) {
        isUrlUpdated = true;
      }
    }
    const updated = await this.itemRepository.update({ id: id }, updateItemDto);
    if (updated.affected < 1)
      throw new InternalServerErrorException(`item ${id} was not updated`);
    if (isUrlUpdated) {
      const urlToDelete = this.storageService.parseUrlToPath(oldUrl);
      await this.storageService.delete(urlToDelete);
    }
    return `Item #${id} was updated`;
  }

  async getAllItems(): Promise<ItemResponseDto[]> {
    const items = await this.itemRepository.find();
    return plainToInstance(ItemResponseDto, items);
  }

  async getItemById(id: string): Promise<ItemResponseDto> {
    const item = await this.itemRepository.findOne({ where: { id } });
    return plainToInstance(ItemResponseDto, item);
  }
}
