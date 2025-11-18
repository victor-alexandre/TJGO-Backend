// src/index.js

const express = require('express');
const { sequelize } = require('./models');
const pedidosRoutes = require('./routes/pedidosRoutes');

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Garçom Eletrônico no ar!');
});

app.use('/pedidos', pedidosRoutes);

async function iniciarServidor() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco estabelecida.');

        app.listen(PORTA, () => {
            console.log(`Servidor rodando na porta ${PORTA}`);
        });
    } catch (error) {
        console.error('Erro ao conectar no banco:', error);
    }
}

iniciarServidor();