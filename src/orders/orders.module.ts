import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { OrderTypes } from './entities/orderTypes.entity';
import { PaymentType } from '../ingredients/entities/paymentTypes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderTypes, PaymentType])],
  providers: [OrderTypes],
})
export class OrdersModule {}
