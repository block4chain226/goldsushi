import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/entities/roles.entity';
import { Category } from '../category/entities/category.entity';
import { Measure } from '../ingredients/entities/measures.entity';
import { Ingredient } from '../ingredients/entities/ingredients.entity';
import { Receipe } from '../receipes/entities/receipes.entity';
import { Item } from '../items/entities/items.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '796163',
  database: 'pizza_delivery',
  entities: [User, Role, Category, Measure, Ingredient, Receipe, Item],
  synchronize: true,
});

export const databaseProviders = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    return await dataSource.initialize();
  },
};
