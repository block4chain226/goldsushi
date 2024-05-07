import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  async verifyJwtToken(token: string): Promise<object> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  createJwtToken(payload: object, duration: string): string {
    return this.jwtService.sign(payload, {
      expiresIn: duration,
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }
}
