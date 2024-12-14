import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly bucket = this.configService.get('GC_BUCKET');
  private storage: Storage;

  constructor(private configService: ConfigService) {
    const keyPath = path.join(__dirname, this.configService.get('GC_KEYPATH'));

    this.storage = new Storage({
      projectId: this.configService.get('GC_PROJECT'),
      credentials: require(keyPath),
    });
  }

  async uploadFile(filePath: string, destination: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucket);
    const [file] = await bucket.upload(filePath, { destination });
    return file.publicUrl();
  }

  parseUrlToPath(url: string): string {
    if (!url)
      throw new BadRequestException('empty path for google cloud storage parsing');

    const urlTodelete = url.substring(url.lastIndexOf(this.bucket) + this.bucket.length + 1);

    return urlTodelete.replace('%2F', '/');
  }

  replaceToSlash(url: string): string {
    return url.replace('%2F', '/');
  }

  async delete(url: string) {
    return await this.storage.bucket(this.bucket).file(url).delete();
  }
}
