require("dotenv").config();
const { Bot, session } = require("grammy");
const { main, createdQuiz } = require("././modules/keyboard/menus");
const { conversations, createConversation } = require("@grammyjs/conversations");
const { hydrate } = require("@grammyjs/hydrate");
const { createNewQuiz, setQuizDesc, setQuizTitle, addQuestion } = require("././modules/keyboard/conversations");
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
  plugins: [hydrate()]
}));



bot.use(createConversation(createNewQuiz, "createNewQuiz"));
bot.use(createConversation(setQuizDesc, "setQuizDesc"));
bot.use(createConversation(setQuizTitle, "setQuizTitle"));
bot.use(createConversation(addQuestion, "addQuestion"));


bot.use(main);





 bot.command("start", async (ctx) => {
     await ctx.reply("Выберите действие", {reply_markup: main});
 });

// Добавьте обработчик для callback
bot.callbackQuery("set_desc", async (ctx) => {
  try {
    await ctx.answerCallbackQuery(); // Обязательно отвечаем на callback
    await ctx.conversation.enter("setQuizDesc");
  } catch (error) {
    console.error("Error when setting quiz description:", error);
    await ctx.reply("Произошла ошибка");
  }
});

bot.callbackQuery("change_name", async (ctx) => {
  try {
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("setQuizTitle");
  } catch (error) {
    console.error("Error when changing quiz name:", error);
    await ctx.reply("Произошла ошибка");
  }
});

bot.callbackQuery("save_exit", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.conversation.exit();
  ctx.session.currentQuizId = undefined;
  await ctx.reply("Выберите действие", {reply_markup: main});
});


 bot.catch((err) => {
  console.error("Ошибка:", err);
});

bot.callbackQuery("add_question", async (ctx) => {
  await ctx.answerCallbackQuery();

  await ctx.conversation.enter("addQuestion");
  await ctx.conversation.exit();
})

console.log("Бот запущен");

bot.start();


