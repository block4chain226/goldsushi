import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderTypes } from './orderTypes.entity';
import { PaymentType } from '../../ingredients/entities/paymentTypes.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'order_id' })
  id: string;
  @Column({ type: 'date', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'date', name: 'delivery_at' })
  delivery_at: Date;
  @Column({ type: 'int' })
  cost: number;
  @Column({ type: 'boolean' })
  delivered: boolean;
  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => OrderTypes, (orderType) => orderType.order, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'order_type_id' })
  orderType: OrderTypes;
  @ManyToOne(() => PaymentType, (paymentType) => paymentType.order, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'payment_type_id' })
  paymentType: PaymentType;
}
