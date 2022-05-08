import { Injectable } from '@nestjs/common';
import { Hears, Help, On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";

import { v1 as uuidv1} from 'uuid';
import * as generate from 'generate-password'
import {Keyboard} from 'telegram-keyboard'

@Update()
@Injectable()
export class TelegramRegistrationBotService {
  getData(): {message: string} {
    return {message: 'welcome'}
  }

  @Start()
  async startCommand(ctx: Context) {
    const test = generate.generate({length: 8, numbers: true})
    await ctx.reply(test);
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async onSticker(ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hearsHi(ctx: Context) {
    await ctx.reply('Hey there');
  }
}
