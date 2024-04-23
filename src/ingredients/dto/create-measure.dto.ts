import { IsString } from 'class-validator';

export class CreateMeasureDto {
  @IsString()
  title: string;
}
