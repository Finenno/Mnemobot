const { conversations } = require("@grammyjs/conversations");
const { Menu } = require("@grammyjs/menu");

const main = new Menu("main-menu")
  .submenu("Мои квизы", "quiz-menu")
  .text("Профиль", (ctx) => ctx.answerCallbackQuery({ text: "А здесь будет вся твоя ЛИЧНАЯ статистика..." }))
  .row()
  .text("Топ квизов", (ctx) => ctx.answerCallbackQuery({ text: "Здесь будет топ всех пользовательских модулей..." }))
  .submenu("FAQ", "help-menu");

const quiz = new Menu("quiz-menu")
  .text("Создать", async (ctx) => { await ctx.conversation.enter("hello"); } )
  .text("Удалить")
  .row()
  .text("Редактировать")
  .back("Назад");

const help = new Menu("help-menu")
  .text("Часто задаваемые вопросы")
  .text("Чат с техподдержкой", async (ctx) => ctx.reply("Контакт для чата с технической поддержкой @fineno"))
  .back("Назад");


// const newquiz = new Menu("newQuiz-menu")
//   .text("Ввести название", async (ctx) => {
//     await ctx.conversation.enter("hello");
//   })
//   .back("Назад", async (ctx) => {
//     await ctx.editMessageText("Выберите действие");
//   });

// Регистрируем все меню
main.register(quiz); 
main.register(help);
//quiz.register(newquiz);
module.exports = {
  main,
  quiz,
  help,
  // newquiz,
};