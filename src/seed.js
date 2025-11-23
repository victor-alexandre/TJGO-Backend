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
    Pagamento
} = require('./models');

async function seed() {
    try {
        // 1. Sincroniza o banco com 'force: true' para limpar tudo e começar do zero
        await sequelize.sync({ force: true });
        console.log('CAIXA: Banco de dados limpo e recriado.');

        // 2. Criar o Restaurante (A raiz de tudo)
        const restaurante = await Restaurante.create({
            nome: 'Sabor da UFG'
        });

        // 3. Criar Usuários (Equipe)
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

        await Mesa.create({
            numero: 2,
            disponivel: true,
            restauranteId: restaurante.id
        });

        // 5. Criar Cardápio e Itens
        const cardapio = await Cardapio.create({
            nome: 'Menu Executivo',
            gerenteId: gerente.id
        });

        const catBebidas = await Categoria.create({ nome: 'Bebidas', cardapioId: cardapio.id });
        const catPratos = await Categoria.create({ nome: 'Pratos Principais', cardapioId: cardapio.id });

        const coca = await ItemCardapio.create({
            nome: 'Coca-Cola Lata',
            preco: 5.00,
            categoriaId: catBebidas.id
        });

        const pratoFeito = await ItemCardapio.create({
            nome: 'Prato Feito (Frango)',
            ingredientes: 'Arroz, feijão, frango grelhado e salada',
            preco: 25.00,
            categoriaId: catPratos.id
        });

        // 6. Simular um fluxo de atendimento na Mesa 1
        // Abrir uma Conta
        const conta = await Conta.create({
            nome: 'Mesa 1 - Almoço Família',
            mesaId: mesa1.id
        });

        // Adicionar Clientes
        const cliente = await Cliente.create({
            nome: 'Maria',
            contaId: conta.id
        });

        // Fazer um Pedido (CORRIGIDO STATUS)
        const pedido = await Pedido.create({
            contaId: conta.id,
            clienteId: cliente.id,
            horarioPedido: new Date(),
            status: 'PENDENTE' // Padrão atualizado conforme nossa regra de negócio
        });

        // CORREÇÃO DE SEGURANÇA PARA O ID
        // Garante que pegamos o ID correto independente se o model chama de 'id' ou 'numero'
        const pedidoId = pedido.id || pedido.numero;

        // Adicionar itens ao pedido (Tabela Pivot ItemPedido)
        // Maria pediu 2 Cocas e 1 Prato Feito
        await ItemPedido.create({
            pedidoId: pedidoId, 
            itemCardapioId: coca.id,
            quantidade: 2
        });

        await ItemPedido.create({
            pedidoId: pedidoId,
            itemCardapioId: pratoFeito.id,
            quantidade: 1
        });

        // 7. Registrar o Pagamento da Conta
        await Pagamento.create({
            tipo: 'Cartao',
            nro_transacao: 987654321,
            contaId: conta.id
        });

        console.log('--------------------------------------------------');
        console.log('✅ Seed realizado com sucesso!');
        console.log('   - Restaurante, Funcionários e Cardápio criados.');
        console.log(`   - Pedido #${pedidoId} criado com status PENDENTE.`);
        console.log('--------------------------------------------------');

    } catch (error) {
        console.error('❌ Erro ao rodar o seed:', error);
    } finally {
        await sequelize.close();
    }
}

seed();