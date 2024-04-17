import { Controller, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailVerifyReturnDto } from './email-verify-return.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email-verify/:token')
  async emailVerify(
    @Param('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userInfo = <EmailVerifyReturnDto>(
      await this.authService.emailVerify(token)
    );
    res.cookie('access-token', userInfo.accessToken, {
      httpOnly: true,
      maxAge: 60 * 2 * 1000,
      sameSite: 'strict',
    });
    res.cookie('refresh-token', userInfo.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 3 * 1000,
      sameSite: 'strict',
    });
    return { msg: 'email was verified successfully' };
  }
}
