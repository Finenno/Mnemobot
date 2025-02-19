const { getQuiz, createQuizWithTitle, setQuizDescription, updateQuizTitle } = require('../db/quiz');
const { createdQuiz } = require("./menus");

async function sendQuizMessage(ctx, quizId, quizData){
  await ctx.reply(`
ID вашего квиза: ${quizId}
Название квиза: ${quizData.title}
Описание квиза: ${quizData.description ? quizData.description : ' - '}
  `, { reply_markup: createdQuiz });
};

async function createNewQuiz(conversation, ctx) {
  let msg = await ctx.reply('Введите название квиза\n(используйте /quit чтобы выйти)');
  const { message } = await conversation.waitFor('message:text');
  if (message.text == "/quit") {
    await conversation.halt();
  };
  const quizId = await conversation.external(() => createQuizWithTitle(ctx.from.id, message.text)); 
  let quizData = await conversation.external(() => getQuiz(quizId));
  await conversation.external((ctx) => ctx.session.currentQuizId = quizId);
  await sendQuizMessage(ctx, quizId, quizData);
  await conversation.halt()
};


async function setQuizDesc(conversation, ctx) {
  await ctx.reply("Введите описание, которое хотите установить: ")
  const quizId = await conversation.external((ctx) => {return ctx.session.currentQuizId});
  const { message } = await conversation.waitFor('message:text');
  try {
    await conversation.external(() => setQuizDescription(quizId, message.text));
    const quizData = await conversation.external(() => getQuiz(quizId));
    await sendQuizMessage(ctx, quizId, quizData);
  } catch (err){
    await ctx.reply("Ошибка!", err);
  };
  await conversation.halt();
};

async function setQuizTitle(conversation, ctx) {
  const quizId = await conversation.external((ctx) => {return ctx.session.currentQuizId});
  await ctx.reply("Введите новое название квиза: ")
  const { message } = await conversation.waitFor('message:text');
  await conversation.external(() => updateQuizTitle(quizId, message.text));
  const quizData = await conversation.external(() => getQuiz(quizId));
  await sendQuizMessage(ctx, quizId, quizData);
  await conversation.halt();
};

async function addQuestion(conversation, ctx){
  await ctx.reply("Введите ваш вопрос");
  const { message } = await conversation.waitFor("message:text");
  await ctx.reply(`Ваш вопрос: ${message.text}`);
  await conversation.halt();
};

module.exports = { createNewQuiz, setQuizDesc, setQuizTitle, addQuestion };