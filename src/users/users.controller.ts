import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor, UseGuards
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserInterceptor } from "../interceptors/createUser.interceptor";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { Public } from "../auth/dto/public.decorator";
import { ResponseUserDto } from "./dto/response-user.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Public()
  @UseInterceptors(CreateUserInterceptor)
  @Post("registration")
  create(
    @Body() createUserDto: CreateUserDto,
    @Body("emailInfo") emailInfo: object
  ) {
    return this.usersService.create(createUserDto, emailInfo);
  }

  @Get()
  findAll(): Promise<ResponseUserDto[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<ResponseUserDto> {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<string> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
