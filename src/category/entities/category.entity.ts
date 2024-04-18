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
  @PrimaryGeneratedColumn('uuid', { name: 'category_id' })
  id: string;
  @Column({ type: 'varchar', length: 30 })
  title: string;
  @Column({ type: 'uuid', nullable: true, name: 'parent_id' })
  parentId?: string;
  @ManyToOne(() => Category, (category) => category.childCategories)
  @JoinColumn({ name: 'parent_id' })
  parentCategory: Category;
  @OneToMany(() => Category, (category) => category.parentCategory, {
    onDelete: 'SET NULL',
  })
  childCategories: Category[];

  constructor(entity: Partial<Category>) {
    Object.assign(this, entity);
  }
}
