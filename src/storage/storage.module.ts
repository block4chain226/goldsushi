import { Module } from "@nestjs/common";
import { StorageService } from "./storage.service";
import { Storage1Service } from "./storage1.service";
import { UPLOAD_PROVIDER } from "./constants/constants";
import { UploadFactory, UploadProvider } from "./upload-factory.provider";
import { AwsProvider } from "./upload-providers/aws/aws.provider";
import { GoogleProvider } from "./upload-providers/google/google.provider";

@Module({
  providers: [Storage1Service, StorageService, UploadProvider, UploadFactory, AwsProvider, GoogleProvider],
  exports: [Storage1Service, StorageService]
})
export class StorageModule {
}
