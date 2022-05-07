import { Body, Controller, ForbiddenException, NotAcceptableException, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterUserDto } from "./dto/register-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../user/user.repository";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,

        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository

    ) {}

  @Post('/send-verification-phone')
  sendVerificationCode(@Body() body) {
      return this.authService.sendVerificationCode(body)
  }

  @Post('/register')
  async register(@Body() body: RegisterUserDto) {
    if (await this.userRepository.findByPhone(body.phoneNumber)) throw new NotAcceptableException()
    if (body.password !== body.passwordRepeat) throw new ForbiddenException()
    const hash = await this.authService.hashPassword(body.password)
    return this.authService.register(body, hash)
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/recovery')
  recovery() {}
}
