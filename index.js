require("dotenv").config();
const {Bot } = require("grammy");
const { main } = require("././modules/keyboard/menus");
const { botStart } = require("./modules/misc/botStart");
const { getServerStats } = require("./modules/misc/serverStats");
const { getUsers, addUser, clearUserTable } = require("./modules/db/pgusers");


const bot = new Bot(process.env.BOT_API_KEY); 
const sendMessagesToAdmins = false;


bot.use(main);

bot.command("start", async (ctx) => {
    try{
        await addUser(
            ctx.message.from.id,
            ctx.message.from.username,
            ctx.message.from.language_code,
            ctx.message.from.is_premium,
            BigInt(ctx.message.date)
        )
    } catch (err) {
        await ctx.reply("err: ", err);
    };
        
    await ctx.reply("Выберите действие", {reply_markup: main});
});

bot.command("bdget", async (ctx) => {
    await ctx.reply(await getUsers());
})

bot.command("bdclear", async (ctx) => {
    await clearUserTable();
    await ctx.reply("cleared!")
})


bot.command("serverstats", async (ctx) => {
    await ctx.reply(getServerStats());
});


bot.start()

setTimeout(() => {
    botStart(bot, sendMessagesToAdmins);
}, 100);