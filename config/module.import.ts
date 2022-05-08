import 'dotenv/config'

import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfig} from "./typeOrm.config";
import {AuthModule} from "../src/auth/auth.module";
import {UserModule} from "../src/user/user.module";
import { TelegrafModule } from "nestjs-telegraf";
import { TelegramRegistrationBotModule } from "../src/telegram-registration-bot/telegram-registration-bot.module";

export const ModuleImport = [
    TypeOrmModule.forRootAsync({useClass: TypeOrmConfig}),
    TelegrafModule.forRoot({
        token: process.env.TELEGRAM_BOT_TOKEN
    }),

    AuthModule,
    UserModule,
    TelegramRegistrationBotModule
]