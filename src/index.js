// src/index.js

const express = require('express');
const { sequelize } = require('./models');
const app = express();
const PORTA = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Garçom Eletrônico no ar!');
});

async function iniciarServidor() {
    try {
        await sequelize.sync({ force: true });
        console.log('Banco de dados sincronizado com sucesso.');

        app.listen(PORTA, () => {
            console.log(`Servidor rodando na porta ${PORTA}`);
        });
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
}

iniciarServidor();