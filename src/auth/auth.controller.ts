import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { EmailVerifyReturnDto } from "./email-verify-return.dto";
import { Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { plainToInstance } from "class-transformer";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "./dto/public.decorator";
import { ConfigService } from "@nestjs/config";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
  }

  @Public()
  @Get("email-verify/:token")
  async emailVerify(
    @Param("token") token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const userInfo = <EmailVerifyReturnDto>(
      await this.authService.emailVerify(token)
    );
    console.log("=>(auth.controller.ts:57) userInfo", userInfo);
    res.cookie("access-token", userInfo.accessToken, {
      httpOnly: true,
      maxAge: this.configService.get("ACCESS_MAX_AGE"),
      sameSite: "strict"
    });
    res.cookie("refresh-token", userInfo.refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get("REFRESH_MAX_AGE"),
      sameSite: "strict"
    });
    return { msg: "email was verified successfully" };
  }

  @Public()
  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<LoginResponseDto> {
    const userInfo = await this.authService.login(loginDto);
    res.cookie("access-token", userInfo.accessToken, {
      httpOnly: true,
      maxAge: this.configService.get("ACCESS_MAX_AGE"),
      sameSite: "strict"
    });
    res.cookie("refresh-token", userInfo.refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get("REFRESH_MAX_AGE"),
      sameSite: "strict"
    });
    return plainToInstance(LoginResponseDto, {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone
    });
  }

  @Public()
  @Post("refresh/:token")
  async refreshToken(
    @Param("token") token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const accessToken = await this.authService.refreshToken(token);
    console.log("=>(auth.controller.ts:72) accessToken", accessToken);
    res.cookie("access-token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: this.configService.get("ACCESS_MAX_AGE")
    });
    return accessToken;
  }
}

