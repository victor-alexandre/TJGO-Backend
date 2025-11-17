// src/config/database.js

const { Sequelize } = require('sequelize');

// Inicializa o Sequelize para usar o SQLite
// 'storage' aponta para o arquivo onde o banco de dados será salvo.
// Como é um trabalho acadêmico, vamos usar um arquivo 'dev.sqlite' na raiz.
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './dev.sqlite'
});

// Documentação: Exportamos a instância 'sequelize'
// para ser usada em outros arquivos (para definir models e sincronizar).
module.exports = sequelize;