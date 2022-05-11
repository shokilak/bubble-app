import { Hears, Wizard, WizardStep } from "nestjs-telegraf";
import { Key, Keyboard } from "telegram-keyboard";
import { Scenes } from "telegraf";

import 'dotenv/config'

@Wizard('start')
export class StartScene {
  @WizardStep(1)
  async enterScene(ctx){
    const keyboard = Keyboard.make([
      [Key.callback('✍🏻 Регистрация ✍🏻', 'registration')],
      [Key.callback('💬 Задать вопрос 💬', 'createQuestion')],
      [Key.callback('🌐 О боте 🌐', 'about')]
    ])

    await ctx.replyWithHTML(`Привествуем! 
Для продолжения выберите один из пунктов <b>меню</b>.`, keyboard.reply())
  }

  @Hears('✍🏻 Регистрация ✍🏻')
  async registration(ctx: Scenes.SceneContext) {
    await ctx.scene.enter('registration')
  }

  // @Hears('💬 Задать вопрос 💬')
  // async createQuestion(ctx: Scenes.SceneContext) {
  //   await ctx.scene.enter('createQuestion')
  // }

  @Hears('🌐 О боте 🌐')
  async about(ctx) {
    await ctx.replyWithHTML(`
<b>BubbleRegistrationBot</b> - официальный бот для регистрации в приложении <b>Bubble</b> с помощью телеграмма.

Версия бота: <b>${process.env.TELEGRAM_BOT_VERSION}</b>
   
Проблемы, которы возникли при взаимодействии, отправляйте через форму ➡️ 💬 Задать вопрос 💬.
    `)
  }
}