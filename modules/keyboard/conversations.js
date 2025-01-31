async function greeting(conversation, ctx) {
    await ctx.reply("Введите название квиза");
    const { message } = await conversation.wait();
    await ctx.reply(`Ваша квиза: ${message.text}!`);

    await ctx.reply(conversation);
  }
  
module.exports = greeting

