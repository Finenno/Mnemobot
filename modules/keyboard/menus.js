const { conversations } = require("@grammyjs/conversations");
const { Menu } = require("@grammyjs/menu");
const { InlineKeyboard } = require("grammy");

// Главное меню
const main = new Menu("main-menu")
  .submenu("Мои квизы", "my-quiz-menu")
  .text("Профиль", (ctx) => ctx.answerCallbackQuery({ text: "А здесь будет вся твоя ЛИЧНАЯ статистика..." }))
  .row()
  .text("Топ квизов", (ctx) => ctx.answerCallbackQuery({ text: "Здесь будет топ всех пользовательских модулей..." }))
  .submenu("FAQ", "help-menu");

// Меню FAQ
const help = new Menu("help-menu")
  .text("Часто задаваемые вопросы")
  .text("Чат с техподдержкой", async (ctx) => ctx.reply("Контакт для чата с технической поддержкой @fineno"))
  .back("Назад");


const createQuiz = new InlineKeyboard() // Спорное решение
  .text("Выйти", "exit_create_quiz");


const myQuizzes = new Menu("my-quiz-menu")
  .text("Создать", async (ctx) => {
    let mainMessage = ctx.session.mainMessage; // Работа с гланым соощбением-меню, оно сохраняется в ctx.session при отправке /start
    await mainMessage.editText("Введите название квиза");
    await mainMessage.editReplyMarkup(createQuiz);
    await ctx.conversation.enter("createNewQuiz");
  } )
  .text("Удалить")
  .row()
  .text("Редактировать")
  .back("Назад");



const createdQuiz = new InlineKeyboard() // На Menu() делать не получилось, потому что не могу перейти из него в conversation. Пока оставлю так.
  .text("Установить описание", "set_desc")
  .text("Поменять название", "change_name")
  .row()
  .text("Добавить вопрос", "add_question")
  .text("Сохранить и выйти", "save_exit");


main.register(help);
main.register(myQuizzes);


module.exports = {
  main,
  help,
  myQuizzes,
  createdQuiz
};