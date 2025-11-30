const { Mesa } = require('../models');

async function seedMesas(restaurante, garcom) {
    console.log('🪑 Montando Mesas...');

    const mesa1 = await Mesa.create({
        numero: 1,
        disponivel: false,
        restauranteId: restaurante.id,
        garcomId: garcom.id
    });

    const mesa2 = await Mesa.create({
        numero: 2,
        disponivel: true,
        restauranteId: restaurante.id
    });

    return { mesa1, mesa2 };
}

module.exports = seedMesas;