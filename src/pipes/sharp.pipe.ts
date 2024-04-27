import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { cut } from '../string.helper';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  constructor(
    private configService: ConfigService,
    @Inject(REQUEST) protected readonly request: Request,
  ) {}
  async transform(image: Express.Multer.File): Promise<string> {
    const handlerName = cut(this.request.body['handler']);
    const originalName = path.parse(image.originalname).name;
    const filename = originalName.replaceAll(' ', '.') + '.webp';
    await sharp(image.buffer)
      .resize(800)
      .webp({ effort: 3 })
      .toFile(
        path.join(this.configService.get<string>(`${handlerName}`), filename),
      );
    return filename;
  }
}
