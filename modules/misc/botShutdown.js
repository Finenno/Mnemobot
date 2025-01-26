/*
const { bot } = require("../../index");

async function botShutdown() {
    console.log('Shutting down bot...');
    await bot.api.sendMessage(622655681, 'Shutting down bot...');
    await bot.api.sendMessage(556690739, 'Shutting down bot...');
    await pool.end() // closing connection to DB
    await bot.api.sendMessage(622655681, 'Database connection is closed');
    await bot.api.sendMessage(556690739, 'Database connection is closed');
    await bot.stop(); // stopping bot
    console.log('Bot stopped');
    process.exit(0);
};

module.exports = { botShutdown };
*/