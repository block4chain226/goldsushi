import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { EmailVerifyReturnDto } from './email-verify-return.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from '../utils/Bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private userService: UsersService,
    private tokenService: TokenService,
    private bcryptService: BcryptService,
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
      '2m',
    );
    const refreshToken = this.tokenService.createJwtToken(
      {
        name: verifiedTokenPayload['name'],
        email: verifiedTokenPayload['email'],
        phone: verifiedTokenPayload['phone'],
      },
      '3m',
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
    if (!user) {
      throw new BadRequestException('invalid login or password');
    }
    const isPassword = await this.bcryptService.verifyPassword(
      loginDto.password,
      user.password,
    );
    console.log('=>(auth.service.ts:91) user', isPassword);
    if (!isPassword) {
      throw new BadRequestException('invalid login or password');
    }
    const payload = {
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    const accessToken = this.tokenService.createJwtToken(payload, '2m');
    const refreshToken = this.tokenService.createJwtToken(payload, '3m');
    if (!accessToken || !refreshToken)
      throw new InternalServerErrorException(
        'email verify: tokens generation error',
      );
    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      accessToken,
      refreshToken,
    };
  }
}
