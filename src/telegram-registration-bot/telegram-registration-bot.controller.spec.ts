import { Test, TestingModule } from '@nestjs/testing';
import { TelegramRegistrationBotController } from './telegram-registration-bot.controller';

describe('TelegramRegistrationBotController', () => {
  let controller: TelegramRegistrationBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramRegistrationBotController],
    }).compile();

    controller = module.get<TelegramRegistrationBotController>(TelegramRegistrationBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
