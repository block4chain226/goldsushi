import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateReceipeDto {
  @IsOptional()
  @IsUUID()
  ingredientId: string;
  @IsOptional()
  @IsUUID()
  itemId: string;
  @IsOptional()
  @IsNumber()
  quantity: number;
}
