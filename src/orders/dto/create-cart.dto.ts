import { IsUUID } from 'class-validator';

export class CreateCartDto {
  @IsUUID()
  itemId: string;
  @IsUUID()
  orderId: string;
}
