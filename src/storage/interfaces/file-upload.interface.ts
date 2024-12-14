export interface IFileUpload {
  upload(folder: string, file: Express.Multer.File): Promise<string>;

  delete(keys: string[]): Promise<void>;
}
