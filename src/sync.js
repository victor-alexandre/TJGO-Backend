// src/sync.js
const { sequelize } = require('./models');

async function sincronizarBanco() {
    try {
        // force: true -> APAGA tudo e recria (Perde dados)
        // force: false -> Apenas cria tabelas que não existem (Mantém dados)
        // alter: true -> Verifica se houve mudança no Model e atualiza a tabela (Tenta manter dados)

        await sequelize.sync({ alter: true });

        console.log('--------------------------------------------------');
        console.log('✅ Banco de dados e tabelas criados com sucesso!');
        console.log('--------------------------------------------------');
    } catch (error) {
        console.error('❌ Erro ao sincronizar banco:', error);
    } finally {
        await sequelize.close();
    }
}

sincronizarBanco();