import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { Measure } from './entities/measures.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredients.entity';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { IngredientsResponseDto } from './dto/ingredients-response.dto';
import { UpdateReceipeDto } from '../receipes/dto/update-receipe.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

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

  async updateIngredient(
    id: string,
    updateIngredient: UpdateIngredientDto,
  ): Promise<string> {
    const ingredient = await this.ingredientsRepository.findOneBy({ id });
    if (!ingredient)
      throw new BadRequestException('ingredient does not exist');
    const updated = await this.ingredientsRepository.update(
      { id: id },
      updateIngredient,
    );
    if (updated.affected < 1)
      throw new InternalServerErrorException('ingredient was not updated');
    return `Ingredient #${id} was updated`;
  }

  async deleteIngredient(id: string): Promise<string> {
    const ingredient = await this.ingredientsRepository.findOneBy({ id });
    if (!ingredient) throw new BadRequestException('ingredient does not exist');
    const deleted = await this.ingredientsRepository.delete({ id });
    if (deleted.affected < 1)
      throw new BadRequestException('ingredient does not exist');
    return `Ingredient #${id} was deleted`;
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
