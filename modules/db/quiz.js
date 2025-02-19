/*

CREATE OR REPLACE FUNCTION set_serial_number()
RETURNS TRIGGER AS $$
BEGIN
    -- Проверяем, если для данного quiz_id уже есть записи
    PERFORM 1 FROM quiz_questions WHERE quiz_id = NEW.quiz_id;
    IF NOT FOUND THEN
        -- Если записей нет, устанавливаем serial_number в 1
        NEW.serial_number := 1;
    ELSE
        -- Если записи есть, находим максимальный serial_number для данного quiz_id и увеличиваем на 1
        SELECT COALESCE(MAX(serial_number), 0) + 1
        INTO NEW.serial_number
        FROM quiz_questions
        WHERE quiz_id = NEW.quiz_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_serial_number_trigger
BEFORE INSERT ON quiz_questions
FOR EACH ROW
EXECUTE FUNCTION set_serial_number();



CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255),
    description TEXT,
    status VARCHAR(50) DEFAULT 'draft', -- draft - черновик, in_progress - в процессе, finished - готовый
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_questions (
    question_id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    serial_number INT -- порядковый номер вопроса, устанавливатся автоматически с помощью sql функции и триггера
    question_text TEXT,
    correct_answer TEXT,
    wrong_answers JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

*/

const pool = require('../../db');


async function getQuiz(quizId){
    try {
        const result = await pool.query(
            'SELECT * FROM quizzes WHERE quiz_id = $1',
            [quizId]
        );
        return result.rows[0];
    } catch (err) {
        return err
    };
};


async function createQuizWithTitle(user_id, quizTitle){
    try {
        // Создаем квиз в main-таблице quizzes, статус "черновик"
        const result = await pool.query(
            'INSERT INTO quizzes (user_id, title, status) VALUES ($1, $2, $3) RETURNING quiz_id',
            [user_id, quizTitle, 'draft']
        );
        const quizId = result.rows[0].quiz_id; // Получаем quiz_id сгенеринное бдшкой

        return quizId

    } catch (err) {
        return err
    };
};

async function updateQuizTitle(quizId, quizTitle){
    try {
        await pool.query(
            'UPDATE quizzes SET title = $1 WHERE quiz_id = $2',
            [quizTitle, quizId]
        );
    } catch (err) {
        return err
    };
};

async function setQuizDescription(quizId, quizDesc){
    try {
        await pool.query(
            'UPDATE quizzes SET description = $1 WHERE quiz_id = $2',
            [quizDesc, quizId]
        );
    } catch (err) {
        return err
    };
};


async function updateQuizTitle(quizId, quizName){
    try {
        await pool.query(
            'UPDATE quizzes SET title = $1 WHERE quiz_id = $2',
            [quizName, quizId]
        );
    } catch (err) {
        return err
    };
};


async function addQuizQuestion(quizId, questionName, correctAnswer, incorrectAnswers){
    try {
        await pool.query(
            'INSERT INTO quiz_questions (quiz_id, question_text, correct_answer, wrong_answers) VALUES ($1, $2, $3, $4)',
            [quizId, questionName, correctAnswer, JSON.stringify(incorrectAnswers)]
        );
    } catch (err) {
        return err
    };
};




module.exports = {
  updateQuizTitle,
  createQuizWithTitle,
  setQuizDescription,
  addQuizQuestion,
  getQuiz,
  updateQuizTitle
};
