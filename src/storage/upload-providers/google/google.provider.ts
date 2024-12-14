import { Injectable } from "@nestjs/common";
import { IFileUpload } from "../../interfaces/file-upload.interface";

@Injectable()
export class GoogleProvider implements IFileUpload {
  constructor() {
  }

  upload(folder: string, file: Express.Multer.File): Promise<string> {
    console.log("aws upload");
    return;
  }

  delete(keys: string[]): Promise<void> {
    return
  }
}
