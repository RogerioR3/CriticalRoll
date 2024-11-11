const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração do diretório público
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: '127.0.0.1',       // Host do banco de dados
    user: 'root',            // Usuário do MySQL
    password: 'Gamer123',    // Senha do MySQL (a mesma do config.inc.php)
    database: 'testelogin'   // Nome do banco de dados
});

db.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

// Rota para registrar o usuário
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    // Aqui você cria o hash da senha
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error("Erro ao gerar hash da senha: -> Erro tipo 07", err);
            return res.status(500).send("Erro ao registrar usuário -> Erro tipo 05");
        }

        // Tente inserir o usuário no banco de dados
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (error, results) => {
            if (error) {
                console.error("Erro ao inserir usuário no banco de dados: -> Erro tipo 08", error);
                return res.status(500).send("Erro ao registrar usuário -> Erro tipo 06");
            }
            return res.status(200).send("Usuário registrado com sucesso! -> Sucesso tipo 04");
        });
    });
});


// Rota para autenticar o login do usuário
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send('Usuário ou senha inválidos -> Erro tipo 02');
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send('Usuário ou senha inválidos -> Erro tipo 01');
        }

        res.send('Login realizado com sucesso! -> Sucesso tipo 03');
    });
});

app.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080');
});

