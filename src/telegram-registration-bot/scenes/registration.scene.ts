import { Hears, SceneEnter, Wizard, WizardStep } from "nestjs-telegraf";
import { Composer, Context, Scenes, Telegram } from "telegraf";
import { Keyboard } from "telegram-keyboard";
import axios from "axios";
import { CheckClientCodeDto } from "../../auth/dto/check-client-code.dto";

@Wizard('registration')
export class RegistrationScene {

  @SceneEnter()
  async enter(ctx) {
    const keyboard = Keyboard.make([
      ['👌 Продолжить'],
      ['⬅️ Обратно'],
    ])
    const chat = await ctx.getChat()
    ctx.session.chatId = chat.id
    await ctx.replyWithHTML(`<b>${ctx.chat.username}</b>, информация аккаунта прочитала, продолжить регистарцию?`, keyboard.reply())
  }

  @WizardStep(1)
  async enterScene(ctx) {
    const keyboard = Keyboard.make(['⬅️ Обратно'])
    await ctx.replyWithHTML(`<b>${ctx.chat.username}</b>, введите код из приложения.`, keyboard.reply())
    await ctx.wizard.next()
  }

  @WizardStep(2)
  async setClientCode(ctx) {
    const keyboard = Keyboard.make([
      ['👀 Проверить код'],
      ['⬅️ Обратно']
    ])
    ctx.session.clientCode = await ctx.message.text
    await ctx.replyWithHTML(`Код <b>${ctx.session.clientCode}</b> принят, проверить?`, keyboard.reply())
    await ctx.wizard.next()
  }

  @WizardStep(4)
  async checkClientCode(ctx) {
    const data: CheckClientCodeDto = {clientCode: ctx.session.clientCode}
    const keyboard = Keyboard.make(['⬅️ Обратно'])

    const flag = await axios.post('http://localhost:8080/auth/check-clientCode', data)

    console.log(flag.data)
    if (flag.data.botCode){
      await ctx.replyWithHTML(`Ваш код <b>${ctx.session.clientCode}</b> найден. Введите код <b>${flag.data.botCode}</b> для продолжения регистрации в вашем приложении <b>Bubble</b>.`, keyboard.reply())

    }
    if (flag.data.botCode == undefined){
      const keyboard = Keyboard.make([
        ['👀 Проверить другой код'],
        ['⬅️ Обратно']
      ])
      await ctx.replyWithHTML(`Ваш код <b>${ctx.session.clientCode}</b> не найден.`, keyboard.reply())
      await ctx.wizard.selectStep(0)
    }
  }

  @Hears('⬅️ Обратно')
  leaveCommand(ctx: Scenes.SceneContext) {
    return ctx.scene.enter('start')
  }
}