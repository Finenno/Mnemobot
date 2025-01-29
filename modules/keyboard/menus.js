const { Menu } = require("@grammyjs/menu");

const main = new Menu("main-menu")
.submenu("Мои модули", "modules-menu")
.text("Профиль", (ctx) => ctx.answerCallbackQuery({text: "А здесь будет вся твоя ЛИЧНАЯ статистика..."}))
.row()
.text("Топ модулей", (ctx) => ctx.answerCallbackQuery({text: "Здесь будет топ всех пользовательских модулей..."}))
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

main.register(modules);
main.register(help);
modules.register(new_theme);

module.exports = {
    main,
    modules,
    help,
    new_theme
};

