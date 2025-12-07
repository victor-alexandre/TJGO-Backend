// src/seeds/04_pedidos.js
const { Conta, Cliente, Pedido, ItemPedido, Pagamento } = require('../models');

async function seedPedidos(mesas, itens) {
    console.log('📝 Simulando Fluxo de Pedidos com Valores...');

    const { mesa1, mesa2 } = mesas;
    const { coca, pratoFrango, pratoCarne, pudim, bacon, fritas } = itens;

    // ========================================================================
    // CENÁRIO 1: MESA 1 (PAGA)
    // ========================================================================
    
    // 1. Cria a Conta zerada
    let conta1 = await Conta.create({ 
        nome: 'Mesa 1 - Almoço Família', 
        mesaId: mesa1.id,
        status: 'ABERTA'
    });
    
    const cliente1 = await Cliente.create({ nome: 'Maria', contaId: conta1.id });

    // 2. Cria Pedidos
    const pedido1 = await Pedido.create({
        contaId: conta1.id,
        clienteId: cliente1.id,
        status: 'FINALIZADO',
        horarioPedido: new Date()
    });

    await ItemPedido.create({ pedidoId: pedido1.id, itemCardapioId: coca.id, quantidade: 2 });
    await ItemPedido.create({ pedidoId: pedido1.id, itemCardapioId: pratoFrango.id, quantidade: 1 });

    // 3. CALCULA O TOTAL (Simulando o sistema fechando a conta)
    // 2 Cocas (5.00) + 1 Frango (25.00) = 35.00
    const totalMesa1 = (coca.preco * 2) + pratoFrango.preco;

    // 4. Atualiza a Conta com o valor e Status
    await conta1.update({
        valorBruto: totalMesa1,
        valorFinal: totalMesa1, // Sem desconto
        status: 'PAGA'
    });

    // 5. Registra Pagamento
    await Pagamento.create({ tipo: 'Cartao', nro_transacao: 123456789, contaId: conta1.id });


    // ========================================================================
    // CENÁRIO 2: MESA 2 (PAGA)
    // ========================================================================
    let conta2 = await Conta.create({ 
        nome: 'Mesa 2 - Jantar Casal', 
        mesaId: mesa2.id,
        status: 'ABERTA' 
    });
    const cliente2 = await Cliente.create({ nome: 'João', contaId: conta2.id });

    const pedido2 = await Pedido.create({
        contaId: conta2.id,
        clienteId: cliente2.id,
        status: 'FINALIZADO',
        horarioPedido: new Date()
    });

    const itemCarne = await ItemPedido.create({ pedidoId: pedido2.id, itemCardapioId: pratoCarne.id, quantidade: 1 });
    await itemCarne.addAdicionaisDoItem([bacon, fritas]); 
    await ItemPedido.create({ pedidoId: pedido2.id, itemCardapioId: pudim.id, quantidade: 2 });

    // CÁLCULO MANUAL DO SEED:
    // Carne (30) + Bacon (4) + Fritas (5) + 2 Pudins (8*2=16) = 55.00
    const totalMesa2 = 30 + 4 + 5 + 16;

    await conta2.update({
        valorBruto: totalMesa2,
        valorFinal: totalMesa2,
        status: 'PAGA'
    });

    await Pagamento.create({ tipo: 'Dinheiro', nro_transacao: null, contaId: conta2.id });


    // ========================================================================
    // CENÁRIO 3: MESA 1 (ABERTA - NÃO ENTRA NO RELATÓRIO)
    // ========================================================================
    let conta3 = await Conta.create({ 
        nome: 'Mesa 1 - Happy Hour', 
        mesaId: mesa1.id,
        status: 'ABERTA' // Ainda está aberta
    });
    const cliente3 = await Cliente.create({ nome: 'Pedro', contaId: conta3.id });

    const pedido3 = await Pedido.create({
        contaId: conta3.id,
        clienteId: cliente3.id,
        status: 'EM_PREPARO',
        horarioPedido: new Date()
    });

    await ItemPedido.create({ pedidoId: pedido3.id, itemCardapioId: coca.id, quantidade: 5 });

    // Atualiza valor parcial, mas mantem status ABERTA
    await conta3.update({
        valorBruto: (coca.preco * 5),
        valorFinal: (coca.preco * 5),
        status: 'ABERTA'
    });

    console.log('   -> Contas atualizadas com valores corretos.');
}

module.exports = seedPedidos;