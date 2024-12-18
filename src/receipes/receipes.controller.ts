import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReceipesService } from './receipes.service';
import { CreateReceipeDto } from './dto/create-receipe.dto';
import { ReceipeResponseDto } from './dto/response-receipe.dto';
import { UpdateReceipeDto } from './dto/update-receipe.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('receipes')
@Controller('receipes')
export class ReceipesController {
  constructor(private readonly receipesService: ReceipesService) {}

  @Post()
  async createReceipe(
    @Body() createReceipeDto: CreateReceipeDto,
  ): Promise<ReceipeResponseDto> {
    return this.receipesService.createReceipe(createReceipeDto);
  }

  @Patch(':id')
  async updateReceipe(
    @Param('id') id: string,
    @Body() updateReceipeDto: UpdateReceipeDto,
  ): Promise<string> {
    return this.receipesService.updateReceipe(id, updateReceipeDto);
  }

  @Delete(':id')
  async deleteReceipe(@Param('id') id: string): Promise<string> {
    return this.receipesService.deleteReceipe(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllReceipes(): Promise<ReceipeResponseDto[]> {
    return this.receipesService.getAllReceipes();
  }
}
