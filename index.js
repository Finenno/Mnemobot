require("dotenv").config();

const { Menu } = require("@grammyjs/menu")
const {Bot, InlineKeyboard, } = require("grammy");

const bot = new Bot(process.env.BOT_API_KEY); 

const main = new Menu("main-menu")
.submenu("Мои модули", "modules-menu")
.text("Профиль", (ctx) => ctx.reply("А здесь будет вся твоя ЛИЧНАЯ статистика..."))
.row()
.text("Топ модулей", (ctx) => ctx.reply("Здесь будет топ всех пользовательских модулей..."))
.submenu("FAQ", "help-menu");

const modules = new Menu("modules-menu")
.submenu("Создать", "new_theme-menu") // Добавить пользовательский ввод темы и сохранение её в бд
.text("Удалить")
.row()
.text("Редактировать")
.back("Назад");

const help = new Menu("help-menu")
.text("Часто задаваемые вопросы")
.text("Чат с техподдержкой", async (ctx) => ctx.reply("Контакт для чата с технической поддержкой @fineno"))
.back("Назад");

const new_theme = new Menu("new_theme-menu")
.text("Добавить")
.text("Удалить")
.row()
.text("Изменить")
.back("Назад");

bot.use(main);
main.register(modules);
main.register(help);
main.register(new_theme);

bot.command("start", async (ctx) => {
    await ctx.reply("Выберите действие", {reply_markup: main});
});

console.log("Бот запущен");
bot.start();