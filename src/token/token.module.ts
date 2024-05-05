import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ global: true, secret: 'ivan123' })],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
