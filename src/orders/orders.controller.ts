import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrdersService } from './orders.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<string> {
    console.log(createOrderDto);
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<OrderResponseDto> {
    return this.orderService.getOrder(id);
  }
}
