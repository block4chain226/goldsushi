import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderTypes } from './orderTypes.entity';
import { PaymentType } from './paymentTypes.entity';
import { Cart } from './cart.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'order_id' })
  id: string;
  @Column({ type: 'uuid', name: 'order_type_id' })
  orderTypeId: string;
  @Column({ type: 'uuid', name: 'payment_type_id' })
  paymentTypeId: string;
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'varchar', name: 'delivery_at' })
  deliveryAt: string;
  @Column({ type: 'int' })
  cost: number;
  @Column({ type: 'boolean', name: 'is_delivered' })
  isDelivered: boolean;

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

  @OneToMany(() => Cart, (cart) => cart.order)
  carts: Cart[];

  constructor(entity: Partial<Order>) {
    Object.assign(this, entity);
  }

  @BeforeInsert()
  setDefaultValues() {
    this.createdAt = new Date();
  }
}
