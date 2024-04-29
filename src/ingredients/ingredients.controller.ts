import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { Ingredient } from './entities/ingredients.entity';
import { IngredientsResponseDto } from './dto/ingredients-response.dto';
import { UpdateReceipeDto } from '../receipes/dto/update-receipe.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post('create-measure')
  async addMeasure(
    @Body() createMeasureDto: CreateMeasureDto,
  ): Promise<string> {
    return this.ingredientsService.createMeasure(createMeasureDto);
  }

  @Post('create-ingredient')
  async createIngredient(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    return this.ingredientsService.createIngredient(createIngredientDto);
  }

  @Patch(':id')
  async updateIngredient(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Promise<string> {
    return this.ingredientsService.updateIngredient(id, updateIngredientDto);
  }

  @Delete(':id')
  async deleteIngredient(@Param('id') id: string): Promise<string> {
    return this.ingredientsService.deleteIngredient(id);
  }

  @Get()
  async getAllIngredients(): Promise<IngredientsResponseDto[]> {
    return this.ingredientsService.getAllIngredients();
  }

  @Get(':id')
  async getIngredient(
    @Param('id') id: string,
  ): Promise<IngredientsResponseDto> {
    return this.ingredientsService.getIngredient(id);
  }
}
