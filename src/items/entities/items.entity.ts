import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Receipe } from '../../receipes/entities/receipes.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid', { name: 'item_id' })
  id: string;
  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;
  @Column({ type: 'varchar', length: 30 })
  title: string;
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'varchar' })
  url: string;
  @ManyToOne(() => Category)
  category: Category;
  @OneToMany(() => Receipe, (receipe) => receipe.item)
  receipes: Receipe[];
}
