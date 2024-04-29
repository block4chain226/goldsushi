import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateIngredientDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsNumber()
  price: number;
  @IsOptional()
  @IsUUID()
  measureId: string;
}
