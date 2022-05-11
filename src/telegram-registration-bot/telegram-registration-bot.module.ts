import { Module } from '@nestjs/common';
import { TelegramRegistrationBotController } from './telegram-registration-bot.controller';
import { TelegramRegistrationBotService } from './telegram-registration-bot.service';
import { RegistrationScene } from "./scenes/registration.scene";
import { CreateQuestionScene } from "./scenes/create-question.scene";
import { StartScene } from "./scenes/start.scene";

@Module({
  imports: [
    StartScene,
    RegistrationScene,
    CreateQuestionScene
  ],
  controllers: [TelegramRegistrationBotController],
  providers: [TelegramRegistrationBotService]
})
export class TelegramRegistrationBotModule {}
