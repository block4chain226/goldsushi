import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    return this.orderService.createOrder(createOrderDto);
  }
}
