import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';

export class CreateItemDto {
  @IsString()
  title: string;
  @IsNumber()
  @Transform(({ value }) => Number.parseInt(value))
  price: number;
  @Optional()
  url: string;
  @IsUUID()
  categoryId: string;
}
