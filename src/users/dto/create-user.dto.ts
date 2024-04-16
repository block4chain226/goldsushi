import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { Role } from '../entities/roles.entity';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsPhoneNumber()
  phone: string;
  registrationToken?: string;
  role: Role;
}
