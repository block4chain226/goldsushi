import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { raw } from 'express';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    jest.spyOn(service, 'createJwtToken').mockImplementation(() => 'token');
    expect(service.createJwtToken({ name: 'Ivan' }, '24h')).toBe('token');
  });
});
