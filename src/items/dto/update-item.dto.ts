import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsNumber()
  price: number;
  @IsOptional()
  @IsString()
  url: string;
  @IsOptional()
  @IsUUID()
  receipeId: string;
}
