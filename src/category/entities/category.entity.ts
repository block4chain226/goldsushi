import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  id: number;
  @Column({ type: 'varchar', length: 30 })
  title: string;
  @ManyToOne(() => Category, (category) => category.childCategories, {
    eager: true,
  })
  @JoinColumn({ name: 'parent_id' })
  parentCategory: Category;
  @OneToMany(() => Category, (category) => category.parentCategory, {
    onDelete: 'SET NULL',
  })
  childCategories: Category[];
}
//
