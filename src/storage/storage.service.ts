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
    this.bucket = 'retouchbucket';
  }

  async uploadFile(filePath: string, destination: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucket);
    const [file] = await bucket.upload(filePath, {
      destination,
    });
    return file.publicUrl();
  }

  async parseUrlToPath(path1: string): Promise<string> {
    console.log('=>(storage.service.ts:31) path1', path1);
    if (!path1)
      throw new BadRequestException(
        'empty path for google cloud storage parsing',
      );
    return path1.substring(path1.lastIndexOf('retouchbucket/') + 14);
  }

  async delete(path: string) {
    await this.storage
      .bucket('retouchbucket')
      .file(path)
      .delete();
  }
}
