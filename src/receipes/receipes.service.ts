import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipe } from './entities/receipes.entity';
import { Repository } from 'typeorm';
import { CreateReceipeDto } from './dto/create-receipe.dto';
import { plainToInstance } from 'class-transformer';
import { ReceipeResponseDto } from './dto/response-receipe.dto';
import { Reflector } from '@nestjs/core';
import { UpdateReceipeDto } from './dto/update-receipe.dto';

@Injectable()
export class ReceipesService {
  constructor(
    @InjectRepository(Receipe) private receipeRepository: Repository<Receipe>,
    private reflector: Reflector,
  ) {}

  async createReceipe(
    createReceipeDto: CreateReceipeDto,
  ): Promise<ReceipeResponseDto> {
    const receipe = new Receipe(createReceipeDto);
    const newReceipe = await this.receipeRepository.save(receipe);
    if (!newReceipe) throw new BadRequestException('receipe was not created');
    return plainToInstance(ReceipeResponseDto, newReceipe);
  }

  async updateReceipe(
    id: string,
    updateReceipeDto: UpdateReceipeDto,
  ): Promise<string> {
    const receipe = await this.receipeRepository.findOneBy({ id });
    if (!receipe) throw new BadRequestException('receipe does not exist');
    const updated = await this.receipeRepository.update(
      { id: id },
      updateReceipeDto,
    );
    if (updated.affected < 1)
      throw new InternalServerErrorException('receipe was not updated');
    return `Receipe #${id} was updated`;
  }

  async deleteReceipe(id: string): Promise<string> {
    const receipe = await this.receipeRepository.findOneBy({ id });
    if (!receipe) throw new BadRequestException('receipe does not exist');
    const deleted = await this.receipeRepository.delete({ id });
    if (deleted.affected < 1)
      throw new BadRequestException('receipe does not exist');
    return `Receipe #${id} was deleted`;
  }

  async getAllReceipes(): Promise<ReceipeResponseDto[]> {
    const receipes = await this.receipeRepository.find();
    return plainToInstance(ReceipeResponseDto, receipes);
  }
}
//TODO update, delete receipes
//TODO update, delete ingredients
