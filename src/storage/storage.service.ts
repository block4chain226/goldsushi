import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';

@Injectable()
export class StorageService {
  private bucket: string;
  private storage: Storage;
  constructor(private configService: ConfigService) {
    const keyPath = path.join(
      __dirname,
      this.configService.get<string>('KEYPATH'),
    );
    this.storage = new Storage({
      projectId: this.configService.get<string>('PROJECT'),
      credentials: require(keyPath),
    });
    this.bucket = this.configService.get<string>('BUCKET');
  }

  async uploadFile(filePath: string, destination: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucket);
    const [file] = await bucket.upload(filePath, {
      destination,
    });
    return file.publicUrl();
  }

  parseUrlToPath(url: string): string {
    if (!url)
      throw new BadRequestException(
        'empty path for google cloud storage parsing',
      );
    console.log('url', url);
    let urlTodelete = url.substring(
      url.lastIndexOf(this.bucket) + this.bucket.length + 1,
    );
    return urlTodelete.replace('%2F', '/');
  }

  async delete(url: string) {
    await this.storage.bucket(this.bucket).file(url).delete();
  }
}
