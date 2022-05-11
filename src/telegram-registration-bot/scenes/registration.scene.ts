import { Hears, Wizard, WizardStep } from "nestjs-telegraf";
import { Composer, Context, Scenes, Telegram } from "telegraf";
import { Keyboard } from "telegram-keyboard";
import axios from "axios";
import { CheckClientCodeDto } from "../../auth/dto/check-client-code.dto";

@Wizard('registration')
export class RegistrationScene {

  @WizardStep(1)
  async enterScene(ctx) {
    const keyboard = Keyboard.make(['⬅️ Обратно'])
    const chat = await ctx.getChat()
    ctx.session.chatId = chat.id
    console.log(ctx.session.chatId)
    await ctx.replyWithHTML(`<b>${ctx.chat.username}</b>, введите код, который написан в приложении!`, keyboard.reply())

    await ctx.wizard.next()
  }

  @WizardStep(2)
  async setClientCode(ctx) {
    ctx.session.clientCode = await ctx.message.text
    const data: CheckClientCodeDto = {
      clientCode: ctx.session.clientCode
    }

    await ctx.telegram.sendMessage(`${ctx.session.chatId}`, `<b>${ctx.chat.username}</b>, ваш код <b>${ctx.session.clientCode}</b> в обработке, ожидайте.`)
    await ctx.wizard.next()
  }

  @WizardStep(4)
  async checkClientCode(ctx) {
    // const flag = await axios.post('http://localhost:8080/auth/check-clientCode', data)
    // if (!flag){
    //   ctx.telegram.sendMessage(`${ctx.session.chatId}`, 'net')
    // }
    // ctx.telegram.sendMessage(`${ctx.session.chatId}`, 'da')

  }

  @Hears('⬅️ Обратно')
  leaveCommand(ctx: Scenes.SceneContext) {
    return ctx.scene.enter('start')
  }
}