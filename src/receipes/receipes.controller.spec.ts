import { Test, TestingModule } from '@nestjs/testing';
import { ReceipesController } from './receipes.controller';
import { ReceipesService } from './receipes.service';

describe('ReceipesController', () => {
  let controller: ReceipesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceipesController],
      providers: [ReceipesService],
    }).compile();

    controller = module.get<ReceipesController>(ReceipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
