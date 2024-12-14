import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { EmailVerifyReturnDto } from './email-verify-return.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from '../utils/Bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private userService: UsersService,
    private tokenService: TokenService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
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
      {
        name: verifiedTokenPayload['name'],
        email: verifiedTokenPayload['email'],
        phone: verifiedTokenPayload['phone'],
      },
      this.configService.get('JWT_ACCESS'),
    );
    const refreshToken = this.tokenService.createJwtToken(
      {
        email: verifiedTokenPayload['email'],
      },
      this.configService.get('JWT_REFRESH'),
    );
    await this.usersRepository.update(
      { registrationToken: token },
      { refreshToken: refreshToken },
    );

    await this.usersRepository.update(
      { registrationToken: token },
      { registered: true, registrationToken: null },
    );
    if (!accessToken || !refreshToken)
      throw new InternalServerErrorException(
        'email verify: tokens generation error',
      );
    return { accessToken, refreshToken };
  }

  async login(loginDto: LoginDto) {
    const user = <User>(
      await this.usersRepository.findOneBy({ email: loginDto.email })
    );
    console.log('user', user);
    if (!user) {
      throw new BadRequestException('invalid login or password');
    }
    const isPassword = await this.bcryptService.verifyPassword(
      loginDto.password,
      user.password,
    );
    if (!isPassword) {
      throw new BadRequestException('invalid login or password');
    }
    if (!user.registered)
      throw new UnauthorizedException('account is not activated');
    const access_payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    const refresh_payload = {
      email: user.email,
    };
    const accessToken = this.tokenService.createJwtToken(
      access_payload,
      this.configService.get('JWT_ACCESS'),
    );
    const refreshToken = this.tokenService.createJwtToken(
      refresh_payload,
      this.configService.get('JWT_REFRESH'),
    );
    if (!accessToken || !refreshToken)
      throw new InternalServerErrorException(
        'email verify: tokens generation error',
      );
    const result = await this.usersRepository.update(
      { email: user.email },
      { refreshToken },
    );
    if (result.affected < 1)
      throw new InternalServerErrorException(
        'user`s refresh token was not written to database',
      );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string): Promise<string> {
    if (!token) throw new BadRequestException('empty refresh token');
    const payload = await this.tokenService.verifyJwtToken(token);
    if (!payload) throw new BadRequestException('invalid refresh token');
    delete payload['exp'];
    const user = await this.userService.findOneByEmail(payload['email']);
    const access_payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    const accessToken = this.tokenService.createJwtToken(
      access_payload,
      this.configService.get('JWT_ACCESS'),
    );
    if (!accessToken) {
      return 'refresh token was expired';
    }
    return accessToken;
  }
}
