import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../utils/Bcrypt/bcrypt.service';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { CreateEmailDto } from '../users/dto/create-email.dto';
import { TokenService } from '../token/token.service';

export class CreateUserInterceptor implements NestInterceptor {
  constructor(
    // @Inject(ConfigService) private configService: ConfigService,
    @Inject(TokenService) private tokenService: TokenService,
    @Inject(BcryptService)
    private bcrypt_service: BcryptService,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Promise<Observable<User>> {
    const request = context.switchToHttp().getRequest();
    request.body.password = await this.bcrypt_service.hashPassword(
      request.body.password,
      10,
    );
    request.body.role = 2;
    const payload = { name: request.body.name };
    const registrationToken = await this.tokenService.createJwtToken(
      payload,
      '24h',
    );
    request.body.registrationToken = registrationToken;
    request.body.emailInfo = {
      to: request.body.email,
      subject: 'gold-sushi: email verification',
      template:
        '/Users/admin/Documents/backend/nestjs/goldushi-api/src/mail/template/template.pug',
      dataTemplate: {
        text: `<a href='http://localhost:3000/auth/email-verify/${registrationToken}'>verify email</a>`,
      },
    };
    return next.handle();
  }
}
