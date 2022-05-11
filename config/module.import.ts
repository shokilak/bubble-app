import 'dotenv/config'

import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfig} from "./typeOrm.config";
import {AuthModule} from "../src/auth/auth.module";
import {UserModule} from "../src/user/user.module";
import { TelegrafModule } from "nestjs-telegraf";
import { TelegramRegistrationBotModule } from "../src/telegram-registration-bot/telegram-registration-bot.module";
import { SessionMiddleware } from "../src/telegram-registration-bot/middlewares/session.middleware";

export const ModuleImport = [
    TypeOrmModule.forRootAsync({useClass: TypeOrmConfig}),
    TelegrafModule.forRootAsync({
        botName: 'TEST BOT',
        useFactory: () => ({
            token: process.env.TELEGRAM_BOT_TOKEN,
            middlewares: [
              SessionMiddleware
            ],
            include: [
              TelegramRegistrationBotModule
            ]
        })
    }),

    AuthModule,
    UserModule,
    TelegramRegistrationBotModule
]