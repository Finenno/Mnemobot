/*
const pool = require("../../db");

async function botShutdown(bot, sendMessagesToAdmins) {
    console.log('Shutting down bot...');
    if (sendMessagesToAdmins === true){
        await bot.api.sendMessage(622655681, 'Shutting down bot...');
        await bot.api.sendMessage(556690739, 'Shutting down bot...');
    };
    await pool.end() // closing connection to DB
    if (sendMessagesToAdmins === true){
        await bot.api.sendMessage(622655681, 'Database connection is closed');
        await bot.api.sendMessage(556690739, 'Database connection is closed');
    }
    console.log("Database connection is closed")
    await bot.stop(); // stopping bot
    console.log('Bot stopped');
    process.exit(0);
};

module.exports = { botShutdown };
*/
