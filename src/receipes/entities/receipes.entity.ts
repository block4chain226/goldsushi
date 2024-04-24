import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from '../../ingredients/entities/ingredients.entity';
import { Item } from '../../items/entities/items.entity';

@Entity('receipes')
export class Receipe {
  @PrimaryGeneratedColumn('uuid', { name: 'receipe_id' })
  id: string;
  @Column({ type: 'uuid', name: 'ingredient_id' })
  ingredientId: string;
  @Column({ type: 'uuid', name: 'item_id' })
  itemId: string;
  @Column({ type: 'int' })
  quantity: number;
  @ManyToOne(() => Ingredient, (ingredient) => ingredient.receipes, {
    eager: true,
  })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
  @OneToOne(() => Item, (item) => item.receipe, { eager: true })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  constructor(entity: Partial<Receipe>) {
    Object.assign(this, entity);
  }
}
