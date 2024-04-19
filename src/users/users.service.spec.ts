import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/roles.entity';
import { MailService } from '../mail/mail.service';
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
  role: 2 as unknown as Role,
};

describe('User service', () => {
  let userService: UsersService;
  let mailServiceMock: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: UserRepositoryMock,
        },
        {
          provide: MailService,
          useValue: {
            sendMail: jest.fn(),
            _bodytemplete: jest.fn(),
            _processSendEmail: jest.fn(),
          },
        },
      ],
    }).compile();
    userService = module.get<UsersService>(UsersService);
    mailServiceMock = module.get<MailService>(MailService);
  });
  it('should compile users service', () => {
    expect(userService).toBeDefined();
  });
  it('should compile mail service', () => {
    expect(mailServiceMock).toBeDefined();
  });
  it('should create user', async () => {
    jest.spyOn(userService, 'create').mockImplementation(async () => 'Ivan');
    const result = await userService.create(user, { email: 'dfvfdv' });
    expect(result).toBe('Ivan');
  });

  it('should throw', async () => {
    UserRepositoryMock.findOneBy.mockResolvedValueOnce({ id: 'uuid', ...user });
    await expect(userService.create(user, { email: 'dfvfdv' })).rejects.toThrow(
      BadRequestException,
    );
  });
});
