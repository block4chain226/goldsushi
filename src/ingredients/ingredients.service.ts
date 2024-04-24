import { BadRequestException, Injectable, Param } from '@nestjs/common';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { Measure } from './entities/measures.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredients.entity';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { IngredientsResponseDto } from './dto/ingredients-response.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
    @InjectRepository(Measure) private measureRepository: Repository<Measure>,
  ) {}
  async createMeasure(createMeasureDto: CreateMeasureDto): Promise<string> {
    const measure = new Measure(createMeasureDto);
    const newMeasure = await this.measureRepository.save(measure);
    if (!newMeasure.id)
      throw new BadRequestException('measure was not created');
    return <string>newMeasure.id;
  }

  async createIngredient(
    createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    const ingredient = new Ingredient(createIngredientDto);
    const newIngredient = await this.ingredientsRepository.save(ingredient);
    if (!newIngredient)
      throw new BadRequestException('ingredient was not created');
    return <Ingredient>newIngredient;
  }

  async getAllIngredients(): Promise<IngredientsResponseDto[]> {
    const ingredients = await this.ingredientsRepository.find();
    return plainToInstance(IngredientsResponseDto, ingredients);
  }

  async getIngredient(id: string): Promise<IngredientsResponseDto> {
    const ingredient = await this.ingredientsRepository.findOne({
      where: { id },
    });
    return plainToInstance(IngredientsResponseDto, ingredient);
  }
}
