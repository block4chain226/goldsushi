import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { StorageModule } from '../storage/storage.module';
import { databaseProviders } from '../database/database.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), StorageModule],
  controllers: [CategoryController],
  providers: [CategoryService, databaseProviders],
})
export class CategoryModule {}
