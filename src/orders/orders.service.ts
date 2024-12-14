import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { BadRequestException, Inject } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { Ingredient } from '../ingredients/entities/ingredients.entity';
import { plainToInstance } from 'class-transformer';
import { LiqpayService } from '../liqpay/liqpay.service';
import { ConfigService } from '@nestjs/config';
const LIQPAY = 'LIQPAY';
import LiqPay = require('../liqpay/liqpay');

export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject(LIQPAY) private liqpayServide: LiqpayService,
    private configService: ConfigService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<string> {
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

    Object.values(createOrderDto.items).forEach(async (item) => {
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
    // TODO FRONTEND
    // @ts-ignore
    const liqpay = new LiqPay(
      this.configService.get('LIQPAY_PUBLIC'),
      this.configService.get('LIQPAY_PRIVATE'),
    );
    const html = liqpay.cnb_form({
      action: 'pay',
      amount: '1',
      currency: 'USD',
      description: 'description text',
      order_id: 'order_id_1',
      version: '3',
    });
    console.log('=>(orders.service.ts:68) html', html);

    return `order ${newOrder.id} was created successfully`;
  }

  async acceptOrder() {
    const liqpay = this.liqpayServide.LiqPay(
      this.configService.get('LIQPAY_PUBLIC'),
      this.configService.get('LIQPAY_PRIVATE'),
    );
    const html = (await liqpay).cnb_form({
      action: 'pay',
      amount: '1',
      currency: 'USD',
      description: 'description text',
      order_id: 'order_id_1',
      version: '3',
    });
    console.log('=>(orders.service.ts:68) html', html);
  }

  async getOrder(id: string): Promise<OrderResponseDto> {
    const order = this.ordersRepository.findOneBy({ id });
    if (!order) throw new BadRequestException(`order ${id} does not exist`);
    return plainToInstance(OrderResponseDto, order);
  }
}
