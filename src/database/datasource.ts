import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
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

export const pgDataSource = TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    password: configService.get('DB_PASSWORD'),
    username: configService.get('DB_USERNAME'),
    database: configService.get('DB_DATABASE'),
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
    logging: true,
  }),
  inject: [ConfigService],
});
