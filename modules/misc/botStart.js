/*
const { bot } = require("../../index");


async function botStart() {
  console.log('Bot started!');
  try {
    // Уведомление о запуске бота
    await bot.api.sendMessage(622655681, 'Bot started!');
    await bot.api.sendMessage(556690739, 'Bot started!');
  } catch (err) {
    console.error('Failed to send startup message:', err);
  }

  try {
    // Подключение к базе данных
    const client = await pool.connect(); // Установить соединение
    console.log('Database connection is established!');
    
    await bot.api.sendMessage(622655681, 'Database connection is established!');
    await bot.api.sendMessage(556690739, 'Database connection is established!');

    client.release(); // Освобождаем соединение
  } catch (err) {
    console.error('Database connection error:', err);

    // Уведомление об ошибке подключения
    const errorMessage = `Database connection error: ${err.message}`;
    await bot.api.sendMessage(622655681, errorMessage);
    await bot.api.sendMessage(556690739, errorMessage);
  }
};

module.exports = { botStart };
*/
