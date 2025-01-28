const pool = require("../../db");


async function botStart(bot, sendMessagesToAdmins) {
  console.log('Bot started!');
  try {
    if (sendMessagesToAdmins === true){
      await bot.api.sendMessage(622655681, 'Bot started!', {
        disable_notification: true
      });
      await bot.api.sendMessage(556690739, 'Bot started!', {
        disable_notification: true
    })};

  } catch (err) {
    console.error('Failed to send startup message:', err);
  }

  try {
    // Подключение к базе данных
    const client = await pool.connect(); // Установить соединение
    console.log('Database connection is established!');
    if (sendMessagesToAdmins === true){
      await bot.api.sendMessage(622655681, 'Database connection is established!', {
        disable_notification: true
      });
      await bot.api.sendMessage(556690739, 'Database connection is established!', {
        disable_notification: true
    })};

    client.release(); // Освобождаем соединение
  } catch (err) {
    console.error('Database connection error:', err);

    const errorMessage = `Database connection error: ${err.message}`;
    if (sendMessagesToAdmins === true){
      await bot.api.sendMessage(622655681, errorMessage, {
        disable_notification: true
      });
      await bot.api.sendMessage(556690739, errorMessage, {
        disable_notification: true
    })};

  }
};

module.exports = { botStart };
