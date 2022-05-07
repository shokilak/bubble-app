import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,

    ) {}

    @Post('/register')
    register() {

    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req) {
        return this.authService.login(req.user)
    }

    @Post('/recovery')
    recovery() {

    }
}
