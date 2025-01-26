require("dotenv").config();
// const { getUsers, addUser, clearUserTable } = require('./modules/db/pgusers');
// // const { botStart } = require("./modules/misc/botStart")
// // const { botShutdown } = require("./modules/misc/botShutdown")
// const { getServerStats, monitorServer } = require("./modules/misc/serverStats")

const {Bot, InlineKeyboard, Keyboard} = require("grammy");
// const fs = require('fs');
// const { createContext } = require("vm");
// const pool = require("./db");

const bot = new Bot(process.env.BOT_API_KEY); 

bot.command("start", async (ctx) => {

    const inlinekeyboard = new InlineKeyboard()
        .text("Мои модули", "modules")
        .text("Профиль", "profile")
        .row()
        .text("Топ модулей", "top")
        .text("FAQ", "help");

    await ctx.reply("Выберите действие", {reply_markup: inlinekeyboard});
    // const InlineKeyboard2 = new InlineKeyboard2().text("Создать").text("Удалить").row().text("Изменить").text("Назад");
});

// bot.on("message", async (ctx) => {
//     const inlinekeyboard = new InlineKeyboard()
//     .text("Первая", "first")
//     .text("Вторая", "secound")
//     .row()
//     .text("Третья", "third");
//     if (ctx.message.text === "абоба") {
//         await ctx.reply("Текст", {
//             reply_markup: inlinekeyboard,
//         });
//     }
// });

// bot.callbackQuery("first", async (ctx) => {
//     console.log(ctx.callbackQuery.message);
// });

// bot.on("callback_query:data", async (ctx) => {
//     await ctx.answerCallbackQuery();
// })

// bot.callbackQuery('button-data', async (ctx) => {
//  
// });


// bot.on("callback_query:data", async (ctx) => {
//      if (ctx.data==="modules") {
//         await ctx.reply("Список твоих модулей", {reply_markup: inlinekeyboard2});
//      }
//      if (ctx.update.callback_query.data === "Топ модулей") {
//         await ctx.reply("Топ модулей");
//      }
//      //console.log(ctx);
// });

bot.callbackQuery("modules", async (ctx) => {
    const inlinekeyboard2 = new InlineKeyboard()
    .text("Создать", "create")
    .text("Удалить", "delete")
    .row()
    .text("Изменить", "edit")
    .text("Назад", "back");

    await ctx.answerCallbackQuery();
    await ctx.reply("Твои модули", {reply_markup: inlinekeyboard2});
    
});

bot.callbackQuery("top", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("Здесь будет топ всех пользовательских модулей...");
});

bot.callbackQuery("profile", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("А здесь будет вся твоя ЛИЧНАЯ статистика...");
});

bot.callbackQuery("help", async (ctx) => {
    const inlinekeyboard3 = new InlineKeyboard()
    .text("Часто задаваемые вопросы", "faq")
    .text("Тех.поддержка", "support");

    await ctx.answerCallbackQuery();
    await ctx.reply("Выбери нужное действие", {reply_markup: inlinekeyboard3});
});

bot.callbackQuery("support", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("Контакт для чата с технической поддержкой @fineno");
});

bot.callbackQuery("faq", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("Здесь будет список часто задаемых вопросов, запарщенный из questions.json");
});

bot.callbackQuery("create", async (ctx) => {
    await ctx.answerCallbackQuery();
});

console.log("Бот запущен");
bot.start();

// ЧЕТО ТЁМИНО
//
// bot.command("sndevadd", async (ctx) => {
//     const timestamp = new Date(ctx.message.date * 1000);
//     const user_id = parseInt(ctx.message.from.id)
//     await ctx.reply(await addUser(
//         user_id,
//         ctx.message.from.username,
//         ctx.message.from.language_code,
//         ctx.message.from.is_premium,
//         timestamp))
// });
 

// bot.command("sndevget", async (ctx) => {
//     await ctx.reply(await getUsers());
// });

// bot.command("sndevclear", async (ctx) => {
//     await ctx.reply(await clearUserTable());
// });

// bot.command("sndevserver", async (ctx) => {
//     await ctx.reply(getServerStats());
// })

// try {
//     bot.start();
//     setInterval(monitorServer, 3000);
// } catch (err) {
//     console.log(err);
// };


/*

// Обработка завершения процесса

process.on('SIGINT', async () => { // Нажатие Ctrl+C
    await botShutdown();
});
process.on('SIGTERM', async () => { // Завершение через SIGTERM (например, в Docker)
    await botShutdown();
});
process.once('SIGUSR2', async () => {
    console.log('Nodemon is restarting the application...');
    await bot.api.sendMessage(622655681, 'Restarting bot...');
    await bot.api.sendMessage(556690739, 'Restarting bot...');
});

// Обработка ошибок
process.on('uncaughtException', async (err) => {
  console.error('Uncaught exception:', err);
  await botShutdown();
});

process.on('unhandledRejection', async (reason) => {
  console.error('Unhandled promise rejection:', reason);
  await botShutdown();
});

module.exports = { bot };

try {
    bot.start();
    botStart();
    setInterval(monitorServer, 3000);
} catch (err) {
    console.log('err with starting: ', err)
};

*/