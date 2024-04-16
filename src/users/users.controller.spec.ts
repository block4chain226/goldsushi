import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BcryptService } from '../utils/Bcrypt/bcrypt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BcryptModule } from '../utils/Bcrypt/bcrypt.module';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

// jest.mock('./users.service');

const moduleMocker = new ModuleMocker(global);

describe('UsersController', () => {
  let controller: UsersController;
  let jwtService: JwtService;
  let bcrypt_service: BcryptService;
  let configService: ConfigService;
  let usersService: UsersService;
  // let repository: Repository<User>;

  const TypeORMMySqlTestingModule = (entities: any[]) =>
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: configService.get('PORT'),
        username: 'postgres',
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BcryptModule,
        // JwtModule,
        TypeORMMySqlTestingModule([User]),
        TypeOrmModule.forFeature([User]),
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      controllers: [UsersController],
      providers: [],
    })
      .useMocker((token) => {
        const result = ['Ivan'];
        if (token === UsersService) {
          return { create: jest.fn().mockResolvedValue(result) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
    jest.spyOn(controller, 'create').mockImplementation(async () => 'Ivan');
    expect(
      await controller.create({
        name: 'Ivan',
        phone: '+380961657493',
        password: '1232',
        email: 'retouch2261@gmail.com',
        registrationToken: 'sfbdsjcdscbjdscbds',
      }),
    ).toBe('Ivan');
  });
});
