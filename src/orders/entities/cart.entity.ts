import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './orders.entity';
import { Item } from '../../items/entities/items.entity';
import { Ingredient } from '../../ingredients/entities/ingredients.entity';
import { JoinTable } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid', { name: 'cart_id' })
  id: string;
  @Column({ type: 'uuid', name: 'order_id' })
  orderId: string;
  @Column({ type: 'uuid', name: 'item_id' })
  itemId: string;

  @ManyToOne(() => Order, (order) => order.carts, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Item, (item) => item.carts, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @ManyToMany(() => Ingredient, { onDelete: 'SET NULL' })
  @JoinTable({
    name: 'add_ingred',
    joinColumn: { name: 'cart_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ingredient_id', referencedColumnName: 'id' },
  })
  ingredients: Ingredient[];

  constructor(entity: Partial<Cart>) {
    Object.assign(this, entity);
  }
}
