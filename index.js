require("dotenv").config();
const { Bot, session } = require("grammy");
const { main, createdQuiz } = require("././modules/keyboard/menus");
const { conversations, createConversation } = require("@grammyjs/conversations");
const { hydrate } = require("@grammyjs/hydrate");
const { createNewQuiz, setQuizDesc } = require("././modules/keyboard/conversations");
const bot = new Bot(process.env.BOT_API_KEY); 

/*
function crateInitialSessionData() {
  return {
    currentQuizId: undefined,
  }
}
*/


bot.use(session({ initial: () => ({ currentQuizId: undefined }) }));


bot.use(conversations({
  plugins: [hydrate(), createdQuiz]
}));



bot.use(createConversation(createNewQuiz, "createNewQuiz"));
bot.use(createConversation(setQuizDesc, "setQuizDesc"));



bot.use(createdQuiz);
bot.use(main);








 bot.command("start", async (ctx) => {
     await ctx.reply("Выберите действие", {reply_markup: main});
 });

 bot.catch((err) => {
  console.error("Ошибка:", err);
});



console.log("Бот запущен");

bot.start();


