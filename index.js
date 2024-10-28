require('dotenv').config();
const { Bot, GrammyError, HttpError, InlineKeyboard } = require('grammy');
const { hydrate } = require('@grammyjs/hydrate');

const bot = new Bot(process.env.BOT_API_KEY);

bot.use(hydrate());

bot.api.setMyCommands([
    {
        command: 'start',
        description: 'Запуск бота',
    },
]);

bot.command("start", async (ctx) => {
    await ctx.react('👍');

    await ctx.reply('Привет\\! Я – BenYbot\\. Чтобы воспользоваться сервисом BenefittY кликни на [ссылку](https://lk.benefitty.ru/person/home) или кнопку ниже', {
        reply_markup: new InlineKeyboard().url('Открыть сервис BenefittY', 'https://lk.benefitty.ru/person/home'),
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
    });
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
    } else if (e instanceof HttpError) {
        console.error('Could not contact Telegram:', e);
    } else {
        console.error('Unknown error:', e);
    }
});

bot.start();
