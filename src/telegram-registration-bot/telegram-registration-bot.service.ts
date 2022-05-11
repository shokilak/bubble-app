import { Injectable } from '@nestjs/common';
import { Hears, Help, Start, Update } from "nestjs-telegraf";
import { Context, Scenes } from "telegraf";

import { v1 as uuidv1} from 'uuid';
import * as generate from 'generate-password'
import { Key, Keyboard } from "telegram-keyboard";


@Update()
@Injectable()
export class TelegramRegistrationBotService {
  @Start()
  async startCommand(ctx: Scenes.SceneContext) {
    await ctx.scene.enter('start')
  }
}
