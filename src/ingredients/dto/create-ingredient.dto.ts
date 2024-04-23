import { IsNumber, IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  title: string;
  @IsNumber()
  price: number;
  @IsString()
  measure_id: string;
}
