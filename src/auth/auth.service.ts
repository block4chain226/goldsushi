import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { EmailVerifyReturnDto } from './email-verify-return.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
  ) {}

  async emailVerify(token: string): Promise<EmailVerifyReturnDto> {
    const registartionToken: string =
      await this.userService.getRegistrationToken(token);
    if (!registartionToken)
      throw new BadRequestException('email verify: invalid registration token');
    const verifiedTokenPayload =
      await this.tokenService.verifyJwtToken(registartionToken);
    if (!verifiedTokenPayload)
      throw new BadRequestException('email verify: invalid registration token');
    const accessToken = this.tokenService.createJwtToken(
      { name: verifiedTokenPayload['name'] },
      '2m',
    );
    const refreshToken = this.tokenService.createJwtToken(
      { name: verifiedTokenPayload['name'] },
      '3m',
    );
    if (!accessToken || !refreshToken)
      throw new InternalServerErrorException(
        'email verify: tokens generation error',
      );
    return { accessToken, refreshToken };
  }
}
