import {
  Body,
  Controller,
  ForbiddenException,
  NotAcceptableException, NotFoundException,
  Post,
  Request,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { CheckPhoneDto } from "./dto/check-phone.dto";
import { CheckClientCodeDto } from "./dto/check-client-code.dto";
import { CheckBotCodeDto } from "./dto/check-bot-code.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  @ApiTags('Auth')
  @ApiOkResponse({description: 'Phone is available. Returned TRUE'})
  @ApiNotAcceptableResponse({description: 'Phone is busy'})
  @Post('/checkPhone')
  async checkPhone(@Body() body: CheckPhoneDto) {
    const phoneAvailabilityFlag = await this.authService.checkPhoneAvailability(body.phoneNumber)

    if (phoneAvailabilityFlag) throw new NotAcceptableException()
    return true
  }

  @ApiTags('Auth')
  @ApiOkResponse({ description: 'Success registration' })
  @ApiNotAcceptableResponse({ description: 'Did not found phone number' })
  @ApiForbiddenResponse({ description: 'Passwords are not the same' })
  @Post('/register-phoneNumber')
  async register(@Body() body: RegisterUserDto) {
    if (await this.userRepository.findByPhone(body.phoneNumber))
      throw new NotAcceptableException();
    if (body.password !== body.passwordRepeat) throw new ForbiddenException();
    const hash = await this.authService.hashPassword(body.password);
    return this.authService.register(body, hash);
  }

  @Post('/register-telegram')
  registerTelegram() {
    return this.authService.loginWithTelegram()
  }

  @ApiTags('Auth')
  @ApiOkResponse({ description: 'Success login' })
  @ApiNotFoundResponse({ description: 'User did not found' })
  @ApiUnauthorizedResponse({ description: 'Bad auth data. Not accessed' })
  @UseGuards(AuthGuard('local'))
  @ApiBody({type: LoginDto})
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiTags('Auth')
  @ApiOkResponse({ description: 'Sent verification code' })
  @Post('/send-verification-phone')
  sendVerificationCode(@Body() body) {
    return this.authService.sendVerificationCode(body);
  }

  @Post('check-clientCode')
  async checkClientCode(@Body() body: CheckClientCodeDto){
    const clientCode = await this.authService.checkClientCode(body.clientCode)
    if (!clientCode) return false
      // throw new NotFoundException({message: 'Client code did not found'})
    return clientCode;
  }

  @Post('check-botCode')
  async checkBotCode(@Body() body: CheckBotCodeDto){
    const botCode = await this.authService.checkBotCode(body.botCode)
    if (!botCode) return false
      // throw new NotFoundException({message: 'Bot code did not found'})
    return true
  }

  @ApiTags('Auth')
  @Post('/recovery')
  recovery() {}
}