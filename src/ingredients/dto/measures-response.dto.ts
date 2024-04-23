import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MeasuresResponseDto {
  @Expose()
  title: string;
}
