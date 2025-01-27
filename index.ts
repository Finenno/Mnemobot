require("dotenv").config();

const { Menu } = require("@grammyjs/menu")
const {Bot, InlineKeyboard, } = require("grammy");


const bot = new Bot(process.env.BOT_API_KEY); 

// Set of user identifiers that have notifications enabled.
const notifications = new Set<number>();

function toggleNotifications(id: number) {
  if (!notifications.delete(id)) notifications.add(id);
}

const menu = new Menu("toggle")
  .text(
    (ctx) => ctx.from && notifications.has(ctx.from.id) ? "🔔" : "🔕",
    (ctx) => {
      toggleNotifications(ctx.from.id);
      ctx.menu.update(); // update the menu!
    },
  );


bot.use(menu);

bot.command("start", async (ctx) => {
    await ctx.reply("Выберите действие", {reply_markup: menu});
});

console.log("Бот запущен");
bot.start();