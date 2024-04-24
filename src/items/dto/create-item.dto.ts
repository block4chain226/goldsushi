import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateItemDto {
  @IsString()
  title: string;
  @IsNumber()
  price: number;
  @IsString()
  url: string;
  @IsUUID()
  categoryId: string;
}
