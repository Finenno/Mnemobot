require("dotenv").config();

const grammy = require("grammy");

const bot = new grammy.Bot(process.env.BOT_API_KEY);

bot.on("message", async (ctx) => ctx.reply("В этом боте вы можете создавать свои карточки для запоминания терминов, новых слов на другом языке и чего бы то ни было другого, что выхотели бы выучить таким образом"));

console.log("12334");

bot.start();