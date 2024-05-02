import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { BadRequestException, Inject } from '@nestjs/common';
import { dataSource } from '../database/database.provider';
import { Cart } from './entities/cart.entity';
import { raw } from 'express';
import { Ingredient } from '../ingredients/entities/ingredients.entity';

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
    const ingredientRepository = queryRunner.manager.getRepository(Ingredient);
    await queryRunner.startTransaction();
    const order = new Order(createOrderDto);
    const newOrder = await orderRepository.save(order);
    if (!newOrder) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('order was not created');
    }

    Object.values(createOrderDto.items).forEach(async (item, index) => {
      const createCartDto = {
        itemId: item['id'],
        orderId: newOrder.id,
      };
      const cart = new Cart(createCartDto);

      item['addIngredients'].forEach(async (item) => {
        const ingredient = await ingredientRepository.findOneBy({
          id: item,
        });
        cart.ingredients = [ingredient];
        const newCart = await cartRepository.save(cart);
        if (!newCart) {
          await queryRunner.rollbackTransaction();
          throw new BadRequestException('cart and order were not created');
        }
      });
      await queryRunner.commitTransaction();
    });
  }
}
