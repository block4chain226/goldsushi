import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { Measure } from '../ingredients/entities/measures.entity';
import { Ingredient } from '../ingredients/entities/ingredients.entity';
import { Receipe } from '../receipes/entities/receipes.entity';
import { Item } from '../items/entities/items.entity';
import { Order } from '../orders/entities/orders.entity';
import { OrderTypes } from '../orders/entities/orderTypes.entity';
import { PaymentType } from '../orders/entities/paymentTypes.entity';
import { Cart } from '../orders/entities/cart.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '796163',
  database: 'pizza_delivery',
  entities: [
    User,
    Category,
    Measure,
    Ingredient,
    Receipe,
    Item,
    Order,
    OrderTypes,
    PaymentType,
    Cart,
  ],
  synchronize: true,
});

export const databaseProviders = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    return await dataSource.initialize();
  },
};
