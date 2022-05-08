import { Test, TestingModule } from '@nestjs/testing';
import { TelegramRegistrationBotService } from './telegram-registration-bot.service';

describe('TelegramRegistrationBotService', () => {
  let service: TelegramRegistrationBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramRegistrationBotService],
    }).compile();

    service = module.get<TelegramRegistrationBotService>(TelegramRegistrationBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
