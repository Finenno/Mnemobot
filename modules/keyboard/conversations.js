const { getQuiz, createQuizWithTitle, setQuizDescription, updateQuizTitle, addQuizQuestion } = require('../db/quiz');
const { createdQuiz } = require("./menus");
const { Keyboard } = require('grammy');


async function sendQuizMessage(ctx, quizId, quizData){ // Отправка сообщения с основной инфой о квизе, в будущем будет доработано
  await ctx.reply(`
ID вашего квиза: ${quizId}
Название квиза: ${quizData.title}
Описание квиза: ${quizData.description ? quizData.description : ' - '}
  `, { reply_markup: createdQuiz });
};


async function createNewQuiz(conversation, ctx) {
  let mainMessage = await conversation.external((ctx) => ctx.session.mainMessage);
  const result = await conversation.waitUntil([
    conversation.waitFor('message:text'),
    conversation.waitFor('callback_query:data')
  ]);
  // Вот тут, должен приходить callback на выход от inline-клавиатуры из menu.js, но я не могу его отловить
  // возможно проблема в том, что callback прилетает извне conversation-а, и нужно менять подход. Разберусь потом -_-
  console.log("Результат: ", result);
  
  message.delete();
  if (message.text == "/quit") {
    await conversation.halt();
  };
  const quizId = await conversation.external(async () => await createQuizWithTitle(ctx.from.id, message.text)); 
  let quizData = await conversation.external(async () => await getQuiz(quizId));
  await conversation.external((ctx) => ctx.session.currentQuizId = quizId);
  await sendQuizMessage(ctx, quizId, quizData);
  await conversation.halt()
};


async function setQuizDesc(conversation, ctx) { // Установка описания квиза
  const quizId = await conversation.external((ctx) => {return ctx.session.currentQuizId}); // Получение id квиза из ctx.session
  if (!quizId) { // Если нет квиза, то выходим из conversation
    await ctx.reply("Ошибка: не выбран квиз для редактирования");
    await conversation.halt();
  }

  await ctx.reply("Введите описание, которое хотите установить: ")
  const { message } = await conversation.waitFor('message:text');
  try {
    await conversation.external(async () => await setQuizDescription(quizId, message.text)); // Установка описания квиза в бд
    const quizData = await conversation.external(async () => await getQuiz(quizId));
    await sendQuizMessage(ctx, quizId, quizData);
  } catch (err){
    await ctx.reply("Ошибка!", err);
  };
  await conversation.halt();
};


async function setQuizTitle(conversation, ctx) {
  const quizId = await conversation.external((ctx) => {return ctx.session.currentQuizId}); // Получение id квиза из ctx.session
  if (!quizId) { // Если нет квиза, то выходим из conversation
    await ctx.reply("Ошибка: не выбран квиз для редактирования");
    await conversation.halt();
  }

  await ctx.reply("Введите новое название квиза: ")
  const { message } = await conversation.waitFor('message:text');
  await conversation.external(async () => await updateQuizTitle(quizId, message.text));
  const quizData = await conversation.external(async () => await getQuiz(quizId));
  await sendQuizMessage(ctx, quizId, quizData);
  await conversation.halt();
};


async function addQuestion(conversation, ctx)  {
  const quizId = await conversation.external((ctx) => {return ctx.session.currentQuizId});

  if (!quizId) { // Если нет квиза, то выходим из conversation
    await ctx.reply("Ошибка: не выбран квиз для редактирования");
    await conversation.halt();
  }

  await ctx.reply("Введите текст вопроса: ")
  const { message: msgQuestionTitle } = await conversation.waitFor('message:text');
  await ctx.reply("Введите варианты ответа построчно: ")
  const { message: msgQuestionAnswers } = await conversation.waitFor('message:text');

  let questionTitle = msgQuestionTitle.text;
  let questionAnswers = msgQuestionAnswers.text.split('\n'); // Разделяем варианты ответа по строкам в виде массива
  const keyboard = new Keyboard()
    .oneTime() // Клавиатура будет удалена после выбора ответа
    .resized();
    
  questionAnswers.forEach((answer, index) => { // Добавляем варианты ответа в клавиатуру
    keyboard.text(answer);
    if ((index + 1) % 2 === 0) { // Если варианты ответа четные, то добавляем новую строку
      keyboard.row();
    }
  });

  await ctx.reply("Выберите правильный ответ:", { reply_markup: keyboard });
  
  const { message } = await conversation.waitFor('message:text');
  const correctAnswer = message.text;
  const incorrectAnswers = questionAnswers.filter(answer => answer !== correctAnswer); // Фильтруем варианты ответа, чтобы оставить только неправильные
  await conversation.external(async () => await addQuizQuestion(quizId, questionTitle, correctAnswer, incorrectAnswers)); // Добавляем вопрос в бд
  const quizData = await conversation.external(async () => await getQuiz(quizId)); // Обновляем данные квиза
  await sendQuizMessage(ctx, quizId, quizData);
  await conversation.halt();
}

module.exports = { createNewQuiz, setQuizDesc, setQuizTitle, addQuestion };