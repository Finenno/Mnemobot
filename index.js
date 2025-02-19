require("dotenv").config();
const { Bot, session } = require("grammy");
const { main, createdQuiz } = require("././modules/keyboard/menus");
const { conversations, createConversation } = require("@grammyjs/conversations");
const { hydrate } = require("@grammyjs/hydrate");
const { createNewQuiz, setQuizDesc, setQuizTitle, addQuestion } = require("././modules/keyboard/conversations");
const bot = new Bot(process.env.BOT_API_KEY); 


// Создание структуры сессии
bot.use(session({ initial: () => ({ currentQuizId: null, mainMessage: null }) }));

// Гидратация
bot.use(hydrate());

// Добавление плагинов/меню в чаты ( conversations )
bot.use(conversations({
  plugins: [hydrate()]
}));


// Регистрация чатов ( conversations )
bot.use(createConversation(createNewQuiz, "createNewQuiz"));
bot.use(createConversation(setQuizDesc, "setQuizDesc"));
bot.use(createConversation(setQuizTitle, "setQuizTitle"));
bot.use(createConversation(addQuestion, "addQuestion"));

// Меню
bot.use(main);

// Команды
 bot.command("start", async (ctx) => {
    let mainMessage = await ctx.reply("Выберите действие", {reply_markup: main});
    ctx.session.mainMessage = mainMessage; // Сохранение гланого сообщения-меню в ctx.session
 });

// Callback handler-ы
bot.callbackQuery("set_desc", async (ctx) => { // Вызов conversation-а для установки описания квиза
  try {
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("setQuizDesc");
  } catch (error) {
    console.error("Error when setting quiz description:", error);
    await ctx.reply("Произошла ошибка");
  }
});


bot.callbackQuery("change_name", async (ctx) => { // Вызов conversation-а для изменения названия квиза
  try {
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("setQuizTitle");
  } catch (error) {
    console.error("Error when changing quiz name:", error);
    await ctx.reply("Произошла ошибка");
  }
});


bot.callbackQuery("save_exit", async (ctx) => { // Выход из conversation-а и возвращение к главному меню
  await ctx.answerCallbackQuery();
  await ctx.conversation.exit();
  ctx.session.currentQuizId = null;
  await ctx.reply("Выберите действие", {reply_markup: main});
});


bot.callbackQuery("add_question", async (ctx) => { // Вызов conversation-а для добавления вопроса
  await ctx.answerCallbackQuery();
  await ctx.conversation.enter("addQuestion");
});


 bot.catch((err) => {
  console.error("Ошибка:", err);
});


console.log("Бот запущен");

bot.start();


