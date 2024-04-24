import { Exclude, Expose, Type } from 'class-transformer';
import { IngredientsResponseDto } from '../../ingredients/dto/ingredients-response.dto';

@Exclude()
export class ReceipeResponseDto {
  @Expose()
  id: string;
  @Expose()
  quantity: number;
  @Type(() => IngredientsResponseDto)
  ingredient: IngredientsResponseDto;
}
