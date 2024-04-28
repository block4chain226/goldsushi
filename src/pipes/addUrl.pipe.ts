import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { cut } from '../string.helper';

@Injectable()
export class AddUrlPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) protected request: Request,
    private configService: ConfigService,
  ) {}
  transform(value: any, metadata: ArgumentMetadata): any {
    this.request.body['handler'] = cut(this.request.body['handler']);
    value.url = this.configService.get<string>(this.request.body['handler']);
    console.log("=>(addUrl.pipe.ts:21) value.url", value.url);
    return value;
  }
}
