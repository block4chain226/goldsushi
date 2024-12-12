import { BaseExceptionFilter } from "@nestjs/core";
import { ArgumentsHost, Catch } from "@nestjs/common";
import { TokenExpiredError } from "@nestjs/jwt";

@Catch(TokenExpiredError)
export class JWTTokenExpiredFilter extends BaseExceptionFilter {
  catch(exception: TokenExpiredError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    res.json({ error: exception.message });
  }
}
