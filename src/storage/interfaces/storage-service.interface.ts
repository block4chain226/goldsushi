export interface IStorageService {
  uploadFIles(folder: string, files: Express.Multer.File[]): Promise<string[]>;
}
