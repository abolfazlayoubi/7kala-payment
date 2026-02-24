import { Controller, Get, Post, Body, UseGuards, Req, UseInterceptors, UsePipes, ValidationPipe, Ip, Headers } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResponse, OtpBody, RegisterDto, TokenUserSchema } from "src/dto/auth.dto";
import { AuthGuard } from "./auth.guard";
import { ApiBody, ApiDefaultResponse, ApiOperation } from "@nestjs/swagger";
import { PersianToEnglishNumberInterceptor } from "../interceptors/PersianToEnglishNumber.interceptor";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: "ارسال otp" })
  @ApiBody({ type: OtpBody })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(PersianToEnglishNumberInterceptor)
  async sendCode(@Body() body: OtpBody, @Headers("x-forwarded-for") ip: string, @Ip() IP: string) {
    let userIp = (await this.authService.ipCheck(ip || IP)) ? body.ip : ip || IP;
    userIp = userIp?.split(",")[0].trim().replace("::ffff:", "");
    // return this.authService.sendCode(body, userIp);
  }
}
