import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { BcryptModule } from '../utils/Bcrypt/bcrypt.module';
import { BcryptService } from '../utils/Bcrypt/bcrypt.service';
import { AuthGuard } from './auth.guard';
import { TokenService } from "../token/token.service";

@Module({
  imports: [TokenModule, TypeOrmModule.forFeature([User]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
})
export class AuthModule {}
