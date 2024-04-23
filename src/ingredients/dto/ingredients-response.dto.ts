import { MeasuresResponseDto } from './measures-response.dto';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class IngredientsResponseDto {
  @Expose()
  title: string;
  @Expose()
  price: number;
  @Expose()
  @Type(() => MeasuresResponseDto)
  measure: MeasuresResponseDto;
}
