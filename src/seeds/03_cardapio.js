const { Cardapio, Categoria, ItemCardapio, Adicional } = require('../models');

async function seedCardapio(gerente) {
    console.log('🍔 Criando Cardápio e Itens...');

    const cardapio = await Cardapio.create({ nome: 'Menu Executivo', gerenteId: gerente.id });

    const catBebidas = await Categoria.create({ nome: 'Bebidas', cardapioId: cardapio.id });
    const catPratos = await Categoria.create({ nome: 'Pratos Principais', cardapioId: cardapio.id });

    // Itens com os novos campos (descricao e categoria string)
    const coca = await ItemCardapio.create({ 
        nome: 'Coca-Cola Lata', 
        preco: 5.00, 
        descricao: 'Lata 350ml gelada',
        categoria: 'Bebida',
        categoriaId: catBebidas.id,
        disponivelNaCozinha: true
    });

    const pratoFrango = await ItemCardapio.create({
        nome: 'Prato Feito (Frango)',
        descricao: 'Arroz, feijão, frango grelhado e salada',
        preco: 25.00,
        categoria: 'Prato Principal',
        categoriaId: catPratos.id,
        disponivelNaCozinha: true
    });

    const pratoCarne = await ItemCardapio.create({
        nome: 'Prato Feito (Carne)',
        descricao: 'Arroz, feijão, carne grelhada e salada',
        preco: 30.00,
        categoria: 'Prato Principal',
        categoriaId: catPratos.id,
        disponivelNaCozinha: true
    });
    
    // Item Indisponível para teste
    const pudim = await ItemCardapio.create({
        nome: 'Pudim',
        descricao: 'Pudim de Leite',
        preco: 8.00,
        categoria: 'Sobremesa',
        disponivelNaCozinha: false
    });

    // Adicionais
    const bacon = await Adicional.create({ nome: 'Extra Bacon', precoExtra: 4.00 });
    const fritas = await Adicional.create({ nome: 'Fritas extra', precoExtra: 5.00 });
    const cebola = await Adicional.create({ nome: 'Cebola caramelizada', precoExtra: 3.00 });

    // Retorna tudo que será necessário para criar pedidos
    return { coca, pratoFrango, pratoCarne, pudim, bacon, fritas, cebola };
}

module.exports = seedCardapio;