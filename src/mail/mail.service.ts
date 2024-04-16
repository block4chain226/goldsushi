import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// @Injectable()
export class MailService {
  constructor(
    private readonly from,
    private readonly to,
    private readonly registrationToken,
    // private jwt_service: JwtService,
  ) {

  }
}
// TODO gen 24h email verify token at createUser.interceptor and put to create-user-dto
