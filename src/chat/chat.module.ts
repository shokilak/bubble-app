import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from "./chat.gateway";

@Module({
  imports: [
  ],
  providers: [
    ChatService
  ],
  controllers: [
    ChatController
  ],
  exports: [
    ChatService
  ]
})
export class ChatModule {}
