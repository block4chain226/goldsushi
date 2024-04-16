import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BadRequestException } from '@nestjs/common';

const UserRepositoryMock = {
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const user = {
  name: 'Ivan',
  phone: '+380961657493',
  password: '1232',
  email: 'retouch2261@gmail.com',
  registrationToken: 'sfbdsjcdscbjdscbds',
};

describe('User service', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: UserRepositoryMock,
        },
      ],
    }).compile();
    userService = module.get<UsersService>(UsersService);
  });

  it('should create user', async () => {
    jest.spyOn(userService, 'create').mockImplementation(async () => 'Ivan');
    const result = await userService.create(user);
    expect(result).toBe('Ivan');
  });

  it('should throw', async () => {
    UserRepositoryMock.findOneBy.mockResolvedValueOnce({ id: 'uuid', ...user });
    await expect(userService.create(user)).rejects.toThrow(BadRequestException);
  });
});
