import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { TokenService } from "../token/token.service";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC } from "./dto/public.decorator";

export class AuthGuard implements CanActivate {
  constructor(@Inject(TokenService) private tokenService: TokenService,
              private readonly reflector: Reflector) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = await this.reflector.getAllAndOverride(IS_PUBLIC, [context.getHandler(), context.getClass()]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    let accessToken = request.headers["authorization"];
    if (!accessToken) throw new UnauthorizedException("not authorized");
    accessToken = accessToken.split(" ")[1];
    console.log("=>(auth.guard.ts:18) accessToken", accessToken);
    const payload = await this.tokenService.verifyJwtToken(accessToken);
    return true;
  }
}
