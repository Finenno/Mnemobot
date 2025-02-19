require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,  // опечатки с proccess
    password: process.env.DB_PASSWORD, // опечатки с proccess
    port: process.env.DB_PORT,
});

client.connect()
.then(() => {
    console.log("Подключение к базе данных установленно");

    return client.query('SELECT * FROM users');
})
.then((result) => {
    console.log('Результат запроса:', result.rows);
    return client.end();
})
.catch((err) => {
    console.log('Ошибка при подключении или выполнении запроса ', err)
})