import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BcryptModule } from '../utils/Bcrypt/bcrypt.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { MailModule } from '../mail/mail.module';
import { TokenService } from '../token/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BcryptModule,
    JwtModule,
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, TokenService],
  exports: [UsersService],
})
export class UsersModule {}
