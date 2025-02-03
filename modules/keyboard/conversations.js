const { updateQuizTitle, createQuizWithTitle, setQuizDescription, addQuizQuestion } = require('../db/quiz');


async function hello(conversation, ctx) {

  quiz = conversation.menu('quiz-menu')
  .text('Добавить вопрос')
  .text('Редактировать описание')
  .row()
  .text('Изменить название');

  await ctx.reply('Введите название квиза\n(используйте /quit чтобы выйти)');
  const { message } = await conversation.waitFor('message:text');
  if (message.text == "/quit") {
    await ctx.menu("quiz-menu", { immediate: true });
    await conversation.halt();

  };
  // const quizId = await conversation.external(() => createQuizWithTitle(ctx.from.id, message.text)); // GOLD RULE -_-
  await ctx.reply (`
ID вашего квиза: #001
Название квиза: ${message.text}
    `, {
    reply_markup: mainMenu,
  });
}

// Экспорт функции
module.exports = { hello };