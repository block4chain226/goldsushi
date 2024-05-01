import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { OrderTypes } from './entities/orderTypes.entity';
import { PaymentType } from './entities/paymentTypes.entity';
import { Cart } from './entities/cart.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { databaseProviders } from '../database/database.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderTypes, PaymentType, Cart])],
  providers: [OrderTypes, OrdersService, databaseProviders],
  controllers: [OrdersController],
})
export class OrdersModule {}
