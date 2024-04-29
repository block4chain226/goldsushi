import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './orders.entity';

@Entity('order_types')
export class OrderTypes {
  @PrimaryGeneratedColumn('uuid', { name: 'order_type_id' })
  id: string;
  @Column({ type: 'varchar', length: 30 })
  title: string;
  @OneToMany(() => Order, (order) => order.orderType)
  order: Order[];
}
