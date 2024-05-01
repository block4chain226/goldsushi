import { Exclude, Expose } from 'class-transformer';
import { OrderTypes } from '../entities/orderTypes.entity';
import { PaymentType } from '../entities/paymentTypes.entity';

@Exclude()
export class OrderResponseDto {
  @Expose()
  id: string;
  @Expose()
  createdAt: Date;
  @Expose()
  deliveryAt: Date;
  @Expose()
  cost: number;
  @Expose()
  userId: string;
  @Expose()
  orderType: OrderTypes;
  @Expose()
  paymentType: PaymentType;
}
