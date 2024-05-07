import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailVerifyReturnDto } from './email-verify-return.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { plainToInstance } from 'class-transformer';

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

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    const userInfo = await this.authService.login(loginDto);
    console.log('=>(auth.controller.ts:57) userInfo', userInfo);
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
    return plainToInstance(LoginResponseDto, {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
    });
  }

  @Post('refresh/:token')
  async refreshToken(
    @Param('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.refreshToken(token);
    console.log("=>(auth.controller.ts:72) accessToken", accessToken);
    res.cookie('access-token', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 2 * 1000,
    });
    return accessToken
  }
}

