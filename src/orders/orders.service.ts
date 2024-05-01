import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { BadRequestException, Inject } from '@nestjs/common';
import { dataSource } from '../database/database.provider';
import { Cart } from './entities/cart.entity';

export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @Inject('DATA_SOURCE') private dataSource: DataSource,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const orderRepository = queryRunner.manager.getRepository(Order);
    const cartRepository = queryRunner.manager.getRepository(Cart);
    await queryRunner.startTransaction();
    const order = new Order(createOrderDto);
    const newOrder = await orderRepository.save(order);
    if (!newOrder) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('order was not created');
    }
    await queryRunner.commitTransaction();
    await queryRunner.release();
  }
}
