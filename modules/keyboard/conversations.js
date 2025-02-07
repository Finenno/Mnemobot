const { getQuiz, createQuizWithTitle, setQuizDescription } = require('../db/quiz');
const { createdQuiz } = require("./menus");


async function createNewQuiz(conversation, ctx) {
  let msg = await ctx.reply('Введите название квиза\n(используйте /quit чтобы выйти)');
  const { message } = await conversation.waitFor('message:text');
  if (message.text == "/quit") {
    await conversation.halt();
  };
  const quizId = await conversation.external(() => createQuizWithTitle(ctx.from.id, message.text)); 
  let quizData = await conversation.external(() => getQuiz(quizId));
  await conversation.external((ctx) => ctx.session.currentQuizId = quizId);
  await ctx.reply (`
ID вашего квиза: ${quizId}
Название квиза: ${quizData.title}
Описание квиза: ${quizData.description ? quizData.description : ' - '}
    `, {
    reply_markup: createdQuiz,
      });
  await conversation.halt()
};


async function setQuizDesc(conversation, ctx) {
  await ctx.reply("Введите описание, которое хотите установить: ")
  const quizId = await conversation.external((ctx) => {return ctx.session.currentQuizId});
  const { message } = await conversation.waitFor('message:text');
  try {
    await conversation.external(() => setQuizDescription(quizId, message.text));
    const quizData = await conversation.external(() => getQuiz(quizId));
    await ctx.reply (`
ID вашего квиза: ${quizId}
Название квиза: ${quizData.title}
Описание квиза: ${quizData.description ? quizData.description : ' - '}
    `, {
    reply_markup: createdQuiz,
      });
    await conversation.halt()
  } catch (err){
    await ctx.reply("Ошибка!", err);
    await conversation.halt();
  } finally {
    await conversation.halt();
  }
};


module.exports = { createNewQuiz, setQuizDesc };