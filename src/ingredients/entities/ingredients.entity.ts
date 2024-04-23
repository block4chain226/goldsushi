import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Measure } from './measures.entity';

@Entity({ name: 'ingredients' })
export class Ingredient {
  @PrimaryGeneratedColumn('uuid', { name: 'ingredient_id' })
  ingredient: string;
  @Column({ type: 'varchar', length: 30 })
  title: string;
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'varchar', nullable: true })
  measure_id: string;
  @ManyToOne(() => Measure, (measure) => measure.ingredients, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'measure_id' })
  measure: Measure;

  constructor(entity: Partial<Ingredient>) {
    Object.assign(this, entity);
  }
}
