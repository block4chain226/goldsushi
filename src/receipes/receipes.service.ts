import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipe } from './entities/receipes.entity';
import { Repository } from 'typeorm';
import { CreateReceipeDto } from './dto/create-receipe.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ReceipeResponseDto } from './dto/response-receipe.dto';

@Injectable()
export class ReceipesService {
  constructor(
    @InjectRepository(Receipe) private receipeRepository: Repository<Receipe>,
  ) {}

  async createReceipe(
    createReceipeDto: CreateReceipeDto,
  ): Promise<ReceipeResponseDto> {
    const receipe = new Receipe(createReceipeDto);
    const newReceipe = await this.receipeRepository.save(receipe);
    if (!newReceipe) throw new BadRequestException('receipe was not created');
    return plainToInstance(ReceipeResponseDto, newReceipe);
  }
}
