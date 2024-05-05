import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Measure } from './measures.entity';
import { Receipe } from '../../receipes/entities/receipes.entity';
import { Cart } from '../../orders/entities/cart.entity';

@Entity({ name: 'ingredients' })
export class Ingredient {
  @PrimaryGeneratedColumn('uuid', { name: 'ingredient_id' })
  id: string;
  @Column({ type: 'varchar', length: 30 })
  title: string;
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'varchar', nullable: true, name: 'measure_id' })
  measureId: string;

  @ManyToOne(() => Measure, (measure) => measure.ingredients, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'measure_id' })
  measure: Measure;

  @OneToMany(() => Receipe, (receipe) => receipe.ingredient)
  receipes: Receipe[];

  @ManyToMany(() => Cart)
  carts: Cart[];

  constructor(entity: Partial<Ingredient>) {
    Object.assign(this, entity);
  }
}
