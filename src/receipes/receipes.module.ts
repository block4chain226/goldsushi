import { Module } from '@nestjs/common';
import { ReceipesService } from './receipes.service';
import { ReceipesController } from './receipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipe } from './entities/receipes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipe])],
  controllers: [ReceipesController],
  providers: [ReceipesService],
})
export class ReceipesModule {}
