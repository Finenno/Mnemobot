require("dotenv").config();
const {Bot } = require("grammy");
const { main } = require("././modules/keyboard/menus");
const { botStart } = require("./modules/misc/botStart");
const { startQuizCreation, addQuestionToDraft, finishQuiz, resumeQuiz, getQuizz } = require("./modules/state")

  
const bot = new Bot(process.env.BOT_API_KEY); 
const sendMessagesToAdmins = false;


bot.start()

/*
setTimeout(() => {
    botStart(bot, sendMessagesToAdmins);
}, 100);
*/