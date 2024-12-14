import { Injectable } from "@nestjs/common";
import { IFileUpload } from "../../interfaces/file-upload.interface";
import * as console from "node:console";

@Injectable()
export class AwsProvider implements IFileUpload {
  constructor() {
  }

  upload(folder: string, file: Express.Multer.File): Promise<string> {
    console.log("aws upload");
    return;
  }

  delete(keys: string[]): Promise<void> {
    return;
  }
}
