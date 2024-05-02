import { Global, Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredients.entity';
import { Measure } from './entities/measures.entity';
import { Cart } from '../orders/entities/cart.entity';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, Measure, Cart])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [TypeOrmModule],
})
export class IngredientsModule {}
