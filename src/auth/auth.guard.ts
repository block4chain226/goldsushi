import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

export class AuthGuard implements CanActivate {
  constructor(@Inject(TokenService) private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers['access-token'];
    if (!accessToken) throw new UnauthorizedException('token missing');
    console.log('=>(auth.guard.ts:10) accessToken', accessToken);
    const payload = await this.tokenService.verifyJwtToken(accessToken);
    console.log('=>(auth.guard.ts:13) payload', payload);
    return true;
  }
}
