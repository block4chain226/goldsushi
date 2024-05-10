import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { OrderTypes } from './entities/orderTypes.entity';
import { PaymentType } from './entities/paymentTypes.entity';
import { Cart } from './entities/cart.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { databaseProviders } from '../database/database.provider';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { Ingredient } from '../ingredients/entities/ingredients.entity';
import { IngredientsService } from '../ingredients/ingredients.service';
import { LiqpayModule } from '../liqpay/liqpay.module';

@Module({
  imports: [
    IngredientsModule,
    TypeOrmModule.forFeature([Order, OrderTypes, PaymentType, Ingredient]),
    LiqpayModule,
  ],
  providers: [OrderTypes, OrdersService, databaseProviders],
  controllers: [OrdersController],
  exports: [],
})
export class OrdersModule {}
