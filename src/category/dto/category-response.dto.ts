import { Exclude, Expose, Type } from 'class-transformer';
import { Category } from '../entities/category.entity';

@Exclude()
export class CategoryResponseDto {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  @Type(() => Category)
  parentId: string;
  @Expose()
  url: string;
}
