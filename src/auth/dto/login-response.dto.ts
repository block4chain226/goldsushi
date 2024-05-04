import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResponseDto {
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  phone: string;
}
