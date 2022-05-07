import * as bcrypt from "bcrypt";

import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../user/user.repository";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,

        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async validateUser(phoneNumber: string, pass: string): Promise<any> {
        const user = await this.userRepository.findByPhone(phoneNumber);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async hashPassword(password: string) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) throw new Error(err);
            return hash
        })
    }

    register() {

    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    recovery() {

    }
}
