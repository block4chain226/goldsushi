import { Exclude, Expose } from 'class-transformer';
import { OrderTypes } from '../entities/orderTypes.entity';
import { PaymentType } from '../entities/paymentTypes.entity';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../entities/cart.entity';
import { Item } from '../../items/entities/items.entity';

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
  @Expose()
  user: User;
  @Expose()
  carts: Cart;
}
