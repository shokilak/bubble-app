import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleImport } from '../config/module.import';
import { TelegramRegistrationBotModule } from './telegram-registration-bot/telegram-registration-bot.module';
import { TagModule } from './tag/tag.module';
import { AccountModule } from './account/account.module';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { AppGateway } from './app.gateway';

@Module({
  imports: ModuleImport,
  controllers: [AppController],
  providers: [AppService, ChatGateway, AppGateway],
})
export class AppModule {}
