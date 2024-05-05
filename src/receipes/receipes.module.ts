import { Module } from '@nestjs/common';
import { ReceipesService } from './receipes.service';
import { ReceipesController } from './receipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipe } from './entities/receipes.entity';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Receipe]), TokenModule],
  controllers: [ReceipesController],
  providers: [ReceipesService],
})
export class ReceipesModule {}
