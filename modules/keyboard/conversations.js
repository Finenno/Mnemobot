const { getQuiz, updateQuizTitle, createQuizWithTitle, setQuizDescription, addQuizQuestion } = require('../db/quiz');

async function hello(conversation, ctx) {
  let msg = await ctx.reply('Введите название квиза\n(используйте /quit чтобы выйти)');
  const { message } = await conversation.waitFor('message:text');

  if (message.text == "/quit") {
    await conversation.halt();
  };
  
  const quizId = await conversation.external(() => createQuizWithTitle(ctx.from.id, message.text)); 

  let quizData = await conversation.external(() => getQuiz(quizId));


  const quizMenu = conversation.menu("quizMenu", { autoAnswer: false })
  .text(() => quizData.description ? "Изменить описание" : "Установить описание", async (ctx) => {
    await ctx.reply("Введите описание:")
    let { descMessage } = await conversation.waitFor("message:text");
    await conversation.external(() => setQuizDescription(quizId, descMessage.text));
  });

  

  await ctx.reply (`
ID вашего квиза: ${quizId}
Название квиза: ${quizData.title}
Описание квиза: ${quizData.description ? quizData.description : ' - '}
    `, {
    reply_markup: quizMenu,
      });
};

module.exports = { hello };