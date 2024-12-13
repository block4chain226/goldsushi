import { Test, TestingModule } from '@nestjs/testing';
import { ReceipesService } from './receipes.service';

describe('ReceipesService', () => {
  let service: ReceipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceipesService],
    }).compile();

    service = module.get<ReceipesService>(ReceipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
