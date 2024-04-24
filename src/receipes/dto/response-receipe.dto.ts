import { Exclude, Expose, Type } from 'class-transformer';
import { IngredientsResponseDto } from '../../ingredients/dto/ingredients-response.dto';
import { ItemResponseDto } from '../../items/dto/item-response.dto';

@Exclude()
export class ReceipeResponseDto {
  @Expose()
  id: string;
  @Expose()
  quantity: number;
  @Expose()
  @Type(() => IngredientsResponseDto)
  ingredient: IngredientsResponseDto;
  @Expose()
  @Type(() => ItemResponseDto)
  item: ItemResponseDto;
}
