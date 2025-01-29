/*
CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255),
    description TEXT,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    quiz_id INT REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    state VARCHAR(50) DEFAULT 'draft',
    data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_questions (
    question_id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    question_text TEXT,
    correct_answer TEXT,
    wrong_answers JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

*/

const pool = require('../db');

// создаем квиз с осн. инфой, и создаем сессию (черновик)
async function startQuizCreation(userId, title, description) {
    try {
        // в осн. таблицу
        const result = await pool.query(
        'INSERT INTO quizzes (user_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING quiz_id',
        [userId, title, description, 'draft']
        );
        const quizId = result.rows[0].quiz_id;

        // сессия
        await pool.query(
        'INSERT INTO quiz_sessions (user_id, quiz_id, state, data) VALUES ($1, $2, $3, $4)',
        [userId, quizId, 'draft', '{}']
        );

        return quizId;  // возвращает уникальный ID квиза
    } catch (err) {
        console.err('Error starting quiz creation:', err);
        throw err;
    }
};

// добавляем вопрос в сессию
async function addQuestionToDraft(quizId, questionText, correctAnswer, wrongAnswers) {
    try {
        // извлекаем данные
        const result = await pool.query(
        'SELECT data FROM quiz_sessions WHERE quiz_id = $1 AND state = $2',
        [quizId, 'draft']
        );
        let data = result.rows[0]?.data || {};

        // добавляем к ним вопрос
        const questionId = `question_${Object.keys(data).length + 1}`; 
        data[questionId] = { questionText, correctAnswer, wrongAnswers };

        // сохраняем обратно
        await pool.query(
        'UPDATE quiz_sessions SET data = $1 WHERE quiz_id = $2 AND state = $3',
        [JSON.stringify(data), quizId, 'draft']
        );
    } catch (err) {
        console.err('Error adding question to draft:', err);
        throw err;
    }
};

// завершение квиза, выход из черновика
async function finishQuiz(quizId) {
    try {
        // получаем данные из сессии
        const result = await pool.query(
          'SELECT data FROM quiz_sessions WHERE quiz_id = $1 AND state = $2',
          [quizId, 'draft']
        );
        const data = result.rows[0]?.data || {};

        // отделяем вопросы в таблицу quiz_quiestions
        for (let questionId in data) {
          const { questionText, correctAnswer, wrongAnswers } = data[questionId];
        await pool.query(
            'INSERT INTO quiz_questions (quiz_id, question_text, correct_answer, wrong_answers) VALUES ($1, $2, $3, $4)',
            [quizId, questionText, correctAnswer, JSON.stringify(wrongAnswers)]
        );
        }

        // обновляем статус квиза 
        await pool.query(
        'UPDATE quizzes SET status = $1 WHERE quiz_id = $2',
        ['finished', quizId]
        );

        await pool.query(
        'UPDATE quiz_sessions SET state = $1 WHERE quiz_id = $2',
        ['finished', quizId]
        );
    } catch (err) {
        console.err('Error finishing quiz:', err);
        throw err;
    }
};

// продолжить сессию
async function resumeQuiz(quizId) {
    try {
    // получаем данные о сессии
        const result = await pool.query(
        'SELECT data FROM quiz_sessions WHERE quiz_id = $1 AND state = $2',
        [quizId, 'draft']
        );
        return result.rows[0]?.data || {};
    } catch (err) {
        console.err('Error resuming quiz:', err);
        throw err;
    }
};


module.exports = {
  startQuizCreation,
  addQuestionToDraft,
  finishQuiz,
  resumeQuiz,
};
