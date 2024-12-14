import { BadRequestException, Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { PROVIDER, UPLOAD_PROVIDER } from "./constants/constants";
import { AwsProvider } from "./upload-providers/aws/aws.provider";
import { GoogleProvider } from "./upload-providers/google/google.provider";

@Injectable({ scope: Scope.REQUEST })
export class UploadFactory {
  constructor(@Inject(REQUEST) private readonly request: Request, private readonly aws: AwsProvider, private readonly google: GoogleProvider) {
  }

  getUploadProvider() {
    const provider: PROVIDER = this.request?.query["provider"] as PROVIDER;
    switch (provider) {
      case "aws":
        return this.aws;
      case "google":
        return this.google;
      default:
        throw new BadRequestException("No provider provided");
    }
  }
}

export const UploadProvider = {
  provide: UPLOAD_PROVIDER,
  inject: [UploadFactory],
  useFactory: (uploadFactory: UploadFactory) => {
    return uploadFactory.getUploadProvider();
  },
  exports: [UPLOAD_PROVIDER]
};
