import { Body, Controller, Post } from "@nestjs/common";
import { ReceipesService } from './receipes.service';
import { CreateReceipeDto } from './dto/create-receipe.dto';
import { ReceipeResponseDto } from './dto/response-receipe.dto';

@Controller('receipes')
export class ReceipesController {
  constructor(private readonly receipesService: ReceipesService) {}

  @Post('create-receipe')
  async createReceipe(
    @Body() createReceipeDto: CreateReceipeDto,
  ): Promise<ReceipeResponseDto> {
    return this.receipesService.createReceipe(createReceipeDto);
  }
}
