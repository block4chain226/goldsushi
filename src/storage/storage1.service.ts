import { Inject, Injectable } from "@nestjs/common";
import { UPLOAD_PROVIDER } from "./constants/constants";
import { IFileUpload } from "./interfaces/file-upload.interface";
import { IStorageService } from "./interfaces/storage-service.interface";

@Injectable()
export class Storage1Service implements IStorageService {
  constructor(@Inject(UPLOAD_PROVIDER) private uploadService: IFileUpload) {
  }

  async uploadFIles(folder: string, files: Express.Multer.File[]): Promise<string[]> {
    const urls = await Promise.all(files.map(async (file) => {
      return await this.uploadService.upload("/", file);
    }));
    console.log("=>(storage1.service.ts:13) urls", urls);
    return urls;
  }
}
