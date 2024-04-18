import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/entities/roles.entity';
import { Category } from '../category/entities/category.entity';

export const pgDataSource = TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('HOST'),
    port: configService.get('PORT'),
    password: configService.get('PASSWORD'),
    username: configService.get('USERNAME'),
    entities: [User, Role, Category],
    database: configService.get('DATABASE'),
    synchronize: true,
    logging: true,
  }),
  inject: [ConfigService],
});
