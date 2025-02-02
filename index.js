require("dotenv").config();
const { Bot } = require("grammy");
const { main } = require("././modules/keyboard/menus");
const {main2} = require("././modules/keyboard/menus");
// const greeting = require("././modules/keyboard/conversations")
const { conversations, createConversation } = require(
  "@grammyjs/conversations",
);
 const { hello } = require("././modules/keyboard/conversations"); // Импортируем hello

const bot = new Bot(process.env.BOT_API_KEY); 

bot.use(conversations());

bot.use(createConversation(hello));
bot.use(main);
bot.use(main2);

// bot.command("test", async (ctx) => {
//   await ctx.conversation.enter("hello");
// })
 bot.command("start", async (ctx) => {
     await ctx.reply("Выберите действие", {reply_markup: main});
     await ctx.reply("тест", {reply_markup: main2});
 });
 
// bot.command("input", async (ctx) => {   //Тестирование диалога с пользователем(файл modules/keyboard/conversations)
//    await ctx.conversation.enter("hello");
// });

console.log("Бот запущен");

bot.start();


