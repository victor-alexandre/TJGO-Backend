const { Conta, Cliente, Pedido, ItemPedido, Pagamento } = require('../models');

async function seedPedidos(mesas, itens) {
    console.log('📝 Simulando Fluxo de Pedidos...');

    const { mesa1, mesa2 } = mesas;
    // Desestruturando itens que vieram do seedCardapio
    const { coca, pratoFrango, pratoCarne, bacon, fritas } = itens;

    // 1. Criar Contas e Clientes
    const conta1 = await Conta.create({ nome: 'Mesa 1 - Almoço Família', mesaId: mesa1.id });
    const cliente1 = await Cliente.create({ nome: 'Maria', contaId: conta1.id });

    const conta2 = await Conta.create({ nome: 'Mesa 2 - Jantar Casal', mesaId: mesa2.id });
    const cliente2 = await Cliente.create({ nome: 'João', contaId: conta2.id });

    // 2. Criar Pedidos
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

    // 3. Adicionar itens
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

    // 4. Adicionar extras no prato de carne
    await itemPedido2.addAdicionaisDoItem([bacon, fritas]);

    // 5. Pagamentos
    await Pagamento.create({ tipo: 'Cartao', nro_transacao: 123456789, contaId: conta1.id });
    await Pagamento.create({ tipo: 'Dinheiro', nro_transacao: 987654321, contaId: conta2.id });

    console.log('   -> Pedidos criados com sucesso.');
}

module.exports = seedPedidos;