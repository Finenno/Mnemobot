const pool = require("../../db");

async function getUsers(){
  const text = `SELECT * FROM users`; 
  try {
    const res = await pool.query(text); // create connection
    return res.rows; // results
  } catch (err) {
    return('Error with getting data from database!: ', err);
  };
};


async function addUser(user_id, username, language_code, is_premium, date) { // adding main info about user (tg-ctx) in database
  const text = `
    INSERT INTO users (
      user_id,
      username,
      language_code,
      is_premium,
      date
    ) 
    VALUES (
      $1, $2, $3, $4, to_timestamp($5::bigint)
    )
    RETURNING *;
  `; 

  const values = [user_id, username, language_code, is_premium, date.getTime() / 1000]; 

  try {
    const res = await pool.query(text, values); // создаем подключение и выполняем запрос
    return 'User added successfully!';
  } catch (err) {
    console.error('Error with added user in database:', err); // выводим ошибку в консоль
    return `Error with adding user to the database: ${err.message}`;
  }
};

async function clearUserTable() {
  const text = 'TRUNCATE TABLE users CASCADE';
  try {
    const res = await pool.query(text);
    return('cleared succesfully!');
  } catch (err) {
    return('error with clearing, ', err);
  };
};



module.exports = { getUsers, addUser, clearUserTable };




// check

// (async () => {
//   if (!pool || typeof pool.query !== "function") {
//     console.error("Database pool is not configured properly.");
//     return;
//   }

//   try {
//     console.log("Trying to connect to db...");
//     const res = await pool.query("SELECT NOW()");
//     console.log("Connected to the database:", res.rows[0].now);
//   } catch (err) {
//     console.log("Error connecting to the database:", err);
//   } finally {
//     console.log("Closing the connection");
//     await pool.end();
//   }
// })();
