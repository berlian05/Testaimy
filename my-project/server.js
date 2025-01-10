const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'aboba',
    database: 'aboba'
};

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const db = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        
        if (rows.length > 0) {
            return res.json({ success: true });
        } else {
            return res.json({ success: false });
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    } finally {
        await db.end();
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
