import * as bcrypt from 'bcrypt';

import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { retry } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,

    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async sendVerificationCode(phoneNumber: string) {
    if (await this.checkPhoneAvailability(phoneNumber))
      throw new NotFoundException();
    return true; //todo send verification
  }

  checkPhoneAvailability(phoneNumber: string): Promise<UserEntity | undefined> {
    return this.userRepository.findByPhone(phoneNumber);
  }

  async register(userData: RegisterUserDto, hash) {
    const user = {
      phoneNumber: userData.phoneNumber,
      password: hash,
      username: userData.username,
      first_name: userData.first_name,
      email: userData.email,
      birthday: new Date(),
      sex: userData.sex,
      createdAt: new Date(),
    };
    return this.userRepository.createUser(user);
  }

  async validateUser(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.userRepository.findByPhone(phoneNumber);
    if (!user) throw new NotFoundException();

    const passwordCheckResult = await bcrypt.compare(pass, user.password);
    if (user && passwordCheckResult) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async checkPasswordHash(
    password: string,
    userHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, userHash);
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      first_name: user.first_name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  recovery() {}
}
