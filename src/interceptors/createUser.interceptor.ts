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

export class CreateUserInterceptor implements NestInterceptor {
  constructor(
    @Inject(JwtService) private jwt_Service: JwtService,
    @Inject(BcryptService)
    private bcrypt_service: BcryptService,
    @Inject(ConfigService) private configService: ConfigService,
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
    const secret = this.configService.get('JWT_SECRET');
    const payload = { name: request.body.name };
    const registrationToken = this.jwt_Service.sign(payload, {
      secret: secret,
      expiresIn: '24h',
    });
    request.body.registrationToken = registrationToken;
    const emailInfo: CreateEmailDto = {
      to: request.body.email,
      subject: 'gold-sushi: email verification',
      template:
        '/Users/admin/Documents/backend/nestjs/goldushi-api/src/mail/template/template.pug',
      dataTemplate: {
        text: `http://localhost:3000/auth/verifyEmail/${registrationToken}`,
      },
    };
    request.body.emailInfo = emailInfo;
    return next.handle();
  }
}
