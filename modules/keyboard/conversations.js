const { main2 } = require("./menus");

async function hello(conversation, ctx) {
  await ctx.reply("Введите название квиза:");
  const { message } = await conversation.waitFor("message:text");
  await ctx.reply(`Название вашего квиза: ${message.text}`);
  await ctx.reply("Ваша основная менюшка создания квиза", { 
        reply_markup: main2
      });
}

module.exports = { hello }
