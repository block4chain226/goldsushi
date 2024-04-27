import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/items.entity';
import { StorageService } from '../storage/storage.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), StorageModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
