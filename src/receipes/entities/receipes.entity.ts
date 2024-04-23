import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from '../../ingredients/entities/ingredients.entity';

@Entity('receipes')
export class Receipe {
  @PrimaryGeneratedColumn('uuid', { name: 'receipe_id' })
  id: string;
  @Column({ type: 'int' })
  quantity: number;
  @ManyToOne(() => Ingredient, (ingredient) => ingredient.receipes)
  ingredient: Ingredient;
  @ManyToOne(() => Item, (item) => item.receipes)
  item: Item;

  constructor(entity: Partial<Receipe>) {
    Object.assign(this, entity);
  }
}
