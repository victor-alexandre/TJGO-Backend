// src/seed.js
const {
    sequelize,
    Restaurante,
    Usuario,
    Mesa,
    Cardapio,
    Categoria,
    ItemCardapio,
    Conta,
    Cliente,
    Pedido,
    ItemPedido,
    Pagamento,
    Adicional
} = require('./models');

async function seed() {
    try {
        // 1. Limpar e sincronizar DB
        await sequelize.sync({ force: true });
        console.log('✅ Banco de dados limpo e recriado.');

        // 2. Criar Restaurante
        const restaurante = await Restaurante.create({ nome: 'Sabor da UFG' });

        // 3. Criar Usuários
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

        // 4. Criar Mesas
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

        // 5. Criar Cardápio e Categorias
        const cardapio = await Cardapio.create({ nome: 'Menu Executivo', gerenteId: gerente.id });

        const catBebidas = await Categoria.create({ nome: 'Bebidas', cardapioId: cardapio.id });
        const catPratos = await Categoria.create({ nome: 'Pratos Principais', cardapioId: cardapio.id });

        const coca = await ItemCardapio.create({ nome: 'Coca-Cola Lata', preco: 5.00, categoriaId: catBebidas.id });
        const pratoFrango = await ItemCardapio.create({
            nome: 'Prato Feito (Frango)',
            ingredientes: 'Arroz, feijão, frango grelhado e salada',
            preco: 25.00,
            categoriaId: catPratos.id
        });
        const pratoCarne = await ItemCardapio.create({
            nome: 'Prato Feito (Carne)',
            ingredientes: 'Arroz, feijão, carne grelhada e salada',
            preco: 30.00,
            categoriaId: catPratos.id
        });

        // 6. Criar Adicionais
        const bacon = await Adicional.create({ nome: 'Extra Bacon', precoExtra: 4.00 });
        const fritas = await Adicional.create({ nome: 'Fritas extra', precoExtra: 5.00 });
        const cebola = await Adicional.create({ nome: 'Cebola caramelizada', precoExtra: 3.00 });

        // 7. Criar Contas e Clientes
        const conta1 = await Conta.create({ nome: 'Mesa 1 - Almoço Família', mesaId: mesa1.id });
        const cliente1 = await Cliente.create({ nome: 'Maria', contaId: conta1.id });

        const conta2 = await Conta.create({ nome: 'Mesa 2 - Jantar Casal', mesaId: mesa2.id });
        const cliente2 = await Cliente.create({ nome: 'João', contaId: conta2.id });

        // 8. Criar Pedidos
        const pedido1 = await Pedido.create({
            contaId: conta1.id,
            clienteId: cliente1.id,
            status: 'PENDENTE'
        });

        const pedido2 = await Pedido.create({
            contaId: conta2.id,
            clienteId: cliente2.id,
            status: 'PENDENTE'
        });

        // 9. Adicionar itens aos pedidos (evitando duplicidade)
        await ItemPedido.create({
            pedidoId: pedido1.id,
            itemCardapioId: coca.id,
            quantidade: 2
        });

        await ItemPedido.create({
            pedidoId: pedido1.id,
            itemCardapioId: pratoFrango.id,
            quantidade: 1
        });

        const itemPedido2 = await ItemPedido.create({
            pedidoId: pedido2.id,
            itemCardapioId: pratoCarne.id,
            quantidade: 1
        });

        // Adicionais do item do pedido 2
        await itemPedido2.addAdicionaisDoItem([bacon, fritas]);

        // 10. Pagamentos
        await Pagamento.create({ tipo: 'Cartao', nro_transacao: 123456789, contaId: conta1.id });
        await Pagamento.create({ tipo: 'Dinheiro', nro_transacao: 987654321, contaId: conta2.id });

        console.log('--------------------------------------------------');
        console.log('✅ Seed realizado com sucesso!');
        console.log(`   - Pedido #${pedido1.id} e Pedido #${pedido2.id} criados.`);
        console.log('--------------------------------------------------');

    } catch (error) {
        console.error('❌ Erro ao rodar o seed:', error);
    } finally {
        await sequelize.close();
    }
}

seed();
