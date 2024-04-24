import { Exclude, Expose, Type } from 'class-transformer';
import { Receipe } from '../../receipes/entities/receipes.entity';
import { CategoryResponseDto } from '../../category/dto/category-response.dto';

@Exclude()
export class ItemResponseDto {
  @Expose()
  id: string;
  @Expose()
  @Type(() => CategoryResponseDto)
  category: CategoryResponseDto;
  @Expose()
  title: string;
  @Expose()
  price: number;
  @Expose()
  url: string;
  @Expose()
  @Type(() => Receipe)
  receipe: Receipe;
}
