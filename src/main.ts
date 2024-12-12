import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions
} from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const config = new DocumentBuilder()
    .setTitle("Pizza delivery")
    .setDescription("The Pizza delivery API description")
    .setVersion("1.0")
    .addTag("pizza")
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
}

bootstrap();
