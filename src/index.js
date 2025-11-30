// src/index.js

const express = require('express');
const { sequelize } = require('./models');
const pedidosRoutes = require('./routes/pedidosRoutes');

// --- INÍCIO CONFIG SWAGGER ---
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger'); // Importa o arquivo de configuração que criamos
// --- FIM CONFIG SWAGGER ---

const app = express();
const PORTA = 3000;

app.use(express.json());

// --- ROTA DA DOCUMENTAÇÃO ---
// Acessível em http://localhost:3000/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('API Garçom Eletrônico no ar! Acesse <a href="/api-docs">/api-docs</a> para ver a documentação.');
});

//ROTAS
app.use('/pedidos', pedidosRoutes);
app.use('/itens-cardapio', itemCardapioRoutes);

async function iniciarServidor() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco estabelecida.');

        app.listen(PORTA, () => {
            console.log(`Servidor rodando na porta ${PORTA}`);
            console.log(`Rota principal: http://localhost:${PORTA}/`); 
            console.log(`Swagger disponível em: http://localhost:${PORTA}/api-docs`);
        });
    } catch (error) {
        console.error('Erro ao conectar no banco:', error);
    }
}

iniciarServidor();


