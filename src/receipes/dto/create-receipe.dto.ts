import { IsNumber, IsUUID } from 'class-validator';

export class CreateReceipeDto {
  @IsNumber()
  quantity: number;
  @IsUUID()
  itemId: string;
  @IsUUID()
  ingredientId: string;
}
