require("dotenv").config();

const {Bot } = require("grammy");
const { main, modules, help, new_theme} = require("././modules/keyboard/menus")
const bot = new Bot(process.env.BOT_API_KEY); 

bot.use(main);

bot.command("start", async (ctx) => {
    await ctx.reply("Выберите действие", {reply_markup: main});
});

console.log("Бот запущен");
bot.start();