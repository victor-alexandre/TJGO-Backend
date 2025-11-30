// src/seed.js
const { sequelize } = require('./models');

// --- Importando os arquivos de seeds que foram separados ---
const seedRestauranteUsuarios = require('./seeds/01_restaurante_e_usuarios');
const seedMesas = require('./seeds/02_mesas');
const seedCardapio = require('./seeds/03_cardapio');
const seedPedidos = require('./seeds/04_pedidos');

async function runSeeds() {
    try {
        // 1. Limpeza Global do Banco
        await sequelize.sync({ force: true });
        console.log('🗑️  Banco de dados limpo.');
        console.log('--------------------------------------------------');

        // 2. Execução Sequencial
        const { restaurante, gerente, garcom } = await seedRestauranteUsuarios();
        const mesas = await seedMesas(restaurante, garcom);
        const itensDoCardapio = await seedCardapio(gerente);
        
        await seedPedidos(mesas, itensDoCardapio);

        console.log('--------------------------------------------------');
        console.log('✅ SEED FINALIZADO COM SUCESSO!');
        console.log('--------------------------------------------------');

    } catch (error) {
        console.error('❌ Erro Fatal no Seed:', error);
    } finally {
        await sequelize.close();
    }
}

runSeeds();