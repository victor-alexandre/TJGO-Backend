const { Restaurante, Usuario } = require('../models');

async function seedRestauranteUsuarios() {
    console.log('🏗️  Construindo Infraestrutura (Restaurante e Usuários)...');

    // 1. Restaurante
    const restaurante = await Restaurante.create({ nome: 'Sabor da UFG' });

    // 2. Usuários
    const gerente = await Usuario.create({
        nome: 'Carlos Gerente',
        login: 'carlos.admin',
        senha: '123',
        tipo: 'Gerente',
        restauranteId: restaurante.id
    });

    const garcom = await Usuario.create({
        nome: 'João Garçom',
        login: 'joao.garcom',
        senha: '123',
        tipo: 'Garcom',
        restauranteId: restaurante.id
    });

    const cozinheiro = await Usuario.create({
        nome: 'Ana Chef',
        login: 'ana.chef',
        senha: '123',
        tipo: 'Cozinha',
        restauranteId: restaurante.id
    });

    // Retornamos os objetos para serem usados nos próximos seeds
    return { restaurante, gerente, garcom, cozinheiro };
}

module.exports = seedRestauranteUsuarios;