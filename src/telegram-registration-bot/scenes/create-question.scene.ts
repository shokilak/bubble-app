import { Hears, Wizard, WizardStep } from "nestjs-telegraf";
import { Key, Keyboard } from "telegram-keyboard";
import { Composer, Context, Scenes, session } from "telegraf";

@Wizard('createQuestion')
export class CreateQuestionScene {
  @WizardStep(1)
  async setName(ctx) {
    const keyboard = Keyboard.make(['⬅️ Обратно'])
    await ctx.replyWithHTML(`Напишите имя, по которому модератор сможет к вам обращаться:`, keyboard.reply())
    await ctx.wizard.next()
  }

  @WizardStep(2)
  async setRealName(ctx) {
    ctx.session.userRealName = await ctx.message.text
    await ctx.replyWithHTML(`Введите текст своего обращения, ${ctx.session.userRealName}`)
    await ctx.wizard.next()
  }

  @WizardStep(3)
  async setQuestionText(ctx) {
    const keyboard = Keyboard.make(['Да', 'Нет']).inline()
    ctx.session.questionText = await ctx.message.text
    await ctx.replyWithHTML(`Ваше обращение:
    <b>Ваше имя:</b> ${ctx.session.userRealName}
    <b>Ваш вопрос:</b> ${ctx.session.questionText}

<b>Все верно?</b>`, keyboard)
  }

  @Hears('⬅️ Обратно')
  leaveCommand(ctx: Scenes.SceneContext) {
    return ctx.scene.enter('start')
  }
}