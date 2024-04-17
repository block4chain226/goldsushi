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
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { Buffer } from 'node:buffer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('=>(users.service.ts:24) createUserDto', createUserDto);
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
      await this.mailService.sendMail(createUserDto.emailInfo);
      return newUser.name;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
