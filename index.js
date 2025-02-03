require("dotenv").config();
const { Bot } = require("grammy");
const { main } = require("././modules/keyboard/menus");
const {main2} = require("././modules/keyboard/menus");
const { conversations, createConversation } = require(
  "@grammyjs/conversations",
);
 const { hello } = require("././modules/keyboard/conversations"); // Импортируем hello

const bot = new Bot(process.env.BOT_API_KEY); 

bot.use(conversations());

bot.use(createConversation(hello));
bot.use(main);

 bot.command("start", async (ctx) => {
     await ctx.reply("Выберите действие", {reply_markup: main});
 });
 
console.log("Бот запущен");

bot.start();


