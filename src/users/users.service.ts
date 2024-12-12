import {
  BadRequestException,
  Injectable
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MailService } from "../mail/mail.service";
import { plainToInstance } from "class-transformer";
import { ResponseUserDto } from "./dto/response-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailService: MailService
  ) {
  }

  async create(createUserDto: CreateUserDto, emailInfo: object) {
    const newUser: User = new User(createUserDto);
    await this.userRepository.save(newUser);
    //TODO call mailService to send token, do it with transaction
    await this.mailService.sendMail(emailInfo);
    return newUser;
  }

  async getRegistrationToken(registrationToken: string): Promise<string> {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .select("user.registrationToken")
      .where("user.registrationToken = :registrationToken", {
        registrationToken: registrationToken
      })
      .getOne();
    return user["registrationToken"];
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    return plainToInstance(ResponseUserDto, users);
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    return plainToInstance(ResponseUserDto, user);
  }

  async findOneByEmail(email: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({ where: { email } });
    return plainToInstance(ResponseUserDto, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const updated = await this.userRepository.update(id, updateUserDto);
    if (updated.affected < 1) throw new BadRequestException("user was not updated");
    return `user ${id} was updated successfully`;
  }

  async remove(id: string): Promise<string> {
    const deleted = await this.userRepository.delete(id);
    if (deleted.affected < 1) throw new BadRequestException("user was not deleted");
    return `user ${id} was deleted successfully`;
  }
}
