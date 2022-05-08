import { Module } from '@nestjs/common';
import { TelegramRegistrationBotController } from './telegram-registration-bot.controller';
import { TelegramRegistrationBotService } from './telegram-registration-bot.service';

@Module({
  controllers: [TelegramRegistrationBotController],
  providers: [TelegramRegistrationBotService]
})
export class TelegramRegistrationBotModule {}
