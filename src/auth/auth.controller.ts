import {
  Body,
  Controller,
  ForbiddenException,
  NotAcceptableException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import {
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  @ApiTags('Auth')
  @ApiOkResponse({ description: 'Sent verification code' })
  @Post('/send-verification-phone')
  sendVerificationCode(@Body() body) {
    return this.authService.sendVerificationCode(body);
  }

  @ApiTags('Auth')
  @ApiOkResponse({ description: 'Success registration' })
  @ApiNotAcceptableResponse({ description: 'Did not found phone number' })
  @ApiForbiddenResponse({ description: 'Passwords are not the same' })
  @Post('/register')
  async register(@Body() body: RegisterUserDto) {
    if (await this.userRepository.findByPhone(body.phoneNumber))
      throw new NotAcceptableException();
    if (body.password !== body.passwordRepeat) throw new ForbiddenException();
    const hash = await this.authService.hashPassword(body.password);
    return this.authService.register(body, hash);
  }

  @ApiTags('Auth')
  @ApiOkResponse({ description: 'Success login' })
  @ApiNotFoundResponse({ description: 'User did not found' })
  @ApiUnauthorizedResponse({ description: 'Bad auth data. Not accessed' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiTags('Auth')
  @Post('/recovery')
  recovery() {}
}
