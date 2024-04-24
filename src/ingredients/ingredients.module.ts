import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredients.entity';
import { Measure } from './entities/measures.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, Measure])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
