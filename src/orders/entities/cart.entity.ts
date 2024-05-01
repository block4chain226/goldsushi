import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './orders.entity';
import { Item } from '../../items/entities/items.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid', { name: 'cart_id' })
  id: string;
  @Column({ type: 'uuid', name: 'order_id' })
  order_id: string;
  @Column({ type: 'uuid', name: 'item_id' })
  item_id: string;
  // @ManyToOne(() => Order, (order) => order.carts, {
  //   eager: true,
  // })
  order: Order;
  @ManyToOne(() => Item,(item)=>item.carts, { eager: true })
  items: Item;
}
