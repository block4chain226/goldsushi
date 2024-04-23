import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from './ingredients.entity';

@Entity({ name: 'measures' })
export class Measure {
  @PrimaryGeneratedColumn('uuid', { name: 'measure_id' })
  id: string;
  @Column({ type: 'varchar', length: 20 })
  title: string;
  @OneToMany(() => Ingredient, (ingredient) => ingredient.measure)
  ingredients: Ingredient[];

  constructor(entity: Partial<Measure>) {
    Object.assign(this, entity);
  }
}
