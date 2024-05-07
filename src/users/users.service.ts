import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto, emailInfo: object) {
    // password hash at createUser.interceptor
    const user: User = await this.userRepository
      .findOneBy({
        email: createUserDto.email,
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    if (user) {
      throw new BadRequestException('user already exists');
    }
    try {
      const newUser: User = new User(createUserDto);
      await this.userRepository.save(newUser);
      //TODO call mailService to send token, do it with transaction
      await this.mailService.sendMail(emailInfo);
      return newUser;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async getRegistrationToken(registrationToken: string): Promise<string> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user.registrationToken')
      .where('user.registrationToken = :registrationToken', {
        registrationToken: registrationToken,
      })
      .getOne();
    return user['registrationToken'];
  }

  async getRefreshToken(refreshToken: string): Promise<string> {
    const refToken = await this.userRepository
      .createQueryBuilder('user')
      .select('user.refreshToken')
      .where('user.refreshToken = :refreshToken', {
        refreshToken: refreshToken,
      })
      .getOne();
    console.log('=>(users.service.ts:59) refToken', refToken);
    return refToken.refreshToken;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
