import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Order } from './entities/orders.entity';
import { OrderTypes } from './entities/orderTypes.entity';
import { PaymentType } from './entities/paymentTypes.entity';
import { Ingredient } from '../ingredients/entities/ingredients.entity';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { databaseProviders } from '../database/database.provider';
import { OrdersController } from './orders.controller';
import { Repository } from 'typeorm';
import { AppModule } from '../app.module';

describe('OrderService', () => {
  let ordersService: OrdersService;
  let ordersRepository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppModule],
    }).compile();
  });
});
