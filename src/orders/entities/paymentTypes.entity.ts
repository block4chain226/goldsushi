import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './orders.entity';

@Entity('payment_types')
export class PaymentType {
  @PrimaryGeneratedColumn('uuid', { name: 'payment_type_id' })
  id: string;
  @Column({ type: 'varchar', length: 30 })
  title: string;
  @OneToMany(() => Order, (order) => order.paymentType)
  order: Order[];
}
