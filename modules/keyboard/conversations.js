
async function hello(conversation, ctx) {

  const menu52 = conversation.menu()
    .text("Добавить вопрос")
    .text("Редактировать описание")
    .row()
    .text("Изменить название");

  await ctx.reply("Введите название квиза:");
  const { message } = await conversation.waitFor("message:text");
  await ctx.reply(`Название вашего квиза: <b>${message.text}</b>`, {parse_mode: "HTML"});
  await ctx.reply("Ваша основная менюшка создания квиза", { 
        reply_markup: menu52
      });
}

module.exports = { hello }
