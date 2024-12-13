import { Test, TestingModule } from '@nestjs/testing';
import { IngridientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';

describe('IngridientsController', () => {
  let controller: IngridientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngridientsController],
      providers: [IngredientsService],
    }).compile();

    controller = module.get<IngridientsController>(IngridientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
