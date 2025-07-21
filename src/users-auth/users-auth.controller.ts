import { Body, Controller, HttpCode, Post, Res, Param } from "@nestjs/common";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { ParseIntPipe } from "@nestjs/common";
import { SigninAdminDto } from "../admin/dto/signin-admin.dto";
import { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { AuthService } from "./users-auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SigninUserDto } from "../users/dto/signin-user.dto";

@Controller("auth")
export class UsersAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post("login")
  async login(
    @Body() loginAdminDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(loginAdminDto, res);
  }

  @HttpCode(200)
  @Post("signout")
  signout(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signout(refreshToken, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id") id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
