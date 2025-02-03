require("dotenv").config();
const { Bot } = require("grammy");
const { main, quiz } = require("././modules/keyboard/menus");
const { Menu } = require("@grammyjs/menu");
const { conversations, createConversation } = require("@grammyjs/conversations");
const { hydrate } = require("@grammyjs/hydrate");
const { hello } = require("././modules/keyboard/conversations"); // Импортируем hello

const bot = new Bot(process.env.BOT_API_KEY); 

bot.use(conversations({
  plugins: [hydrate()]
}));
bot.use(createConversation(hello));
bot.use(main);
bot.use(quiz);

// bot.command("test", async (ctx) => {
//   await ctx.conversation.enter("hello");
// })
 bot.command("start", async (ctx) => {
     await ctx.reply("Выберите действие", {reply_markup: main});
 });

 bot.on("message:sticker", async (ctx) => {
  await ctx.reply("шо быкуешь нипон")
 })

 
// bot.command("input", async (ctx) => {   //Тестирование диалога с пользователем(файл modules/keyboard/conversations)
//    await ctx.conversation.enter("hello");
// });

console.log("Бот запущен");

bot.start();


