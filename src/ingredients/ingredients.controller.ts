import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { Ingredient } from './entities/ingredients.entity';
import { IngredientsResponseDto } from './dto/ingredients-response.dto';

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
