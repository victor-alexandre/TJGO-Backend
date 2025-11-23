// src/services/PedidoService.js

const { Pedido, ItemPedido, Mesa, Conta, ItemCardapio } = require('../models');

// PedidoService contém a Regra de Negócio para o fluxo de Pedidos.

class PedidoService {

    async listarTodos() {
        return Pedido.findAll({
            include: [
                {
                    model: Conta,
                    attributes: ['nome'],
                    include: [{ model: Mesa, attributes: ['numero'] }]
                },
                {
                    model: ItemCardapio,
                    through: { attributes: ['quantidade'] },
                    attributes: ['nome', 'preco']
                }
            ]
        });
    }

    async criarPedido(contaId, clienteId, itens) {
        const conta = await Conta.findByPk(contaId);
        if (!conta) {
            throw new Error(`Conta com ID ${contaId} não encontrada.`);
        }

        // Cria o pedido. O status inicial é PENDENTE.
        const novoPedido = await Pedido.create({
            contaId,
            clienteId,
            status: 'PENDENTE' 
        });

        const idGerado = novoPedido.id || novoPedido.numero;

        if (!idGerado) {
            throw new Error("Erro Crítico: O Pedido foi criado, mas o ID não foi retornado pelo banco. Verifique se 'autoIncrement: true' está no seu Model Pedido.");
        }

        const itemPedidos = itens.map(item => ({
            pedidoId: idGerado, // Agora usa a variável garantida
            itemCardapioId: item.itemCardapioId || item.id,
            quantidade: item.quantidade
        }));

        await ItemPedido.bulkCreate(itemPedidos);

        console.log(`[PedidoService]: Novo Pedido #${idGerado} para a Conta: ${conta.nome}`);

        return novoPedido;
    }

    async atualizar(id, dadosAtualizados) {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) throw new Error('Pedido não encontrado');
        
        return await pedido.update(dadosAtualizados);
    }

    async remover(id) {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) throw new Error('Pedido não encontrado');

        if (pedido.status !== 'PENDENTE') {
            throw new Error('Não é possível cancelar um pedido que já foi enviado para a cozinha.');
        }

        return await pedido.destroy();
    }

    async enviarParaCozinha(id) {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) throw new Error('Pedido não encontrado');

        if (pedido.status !== 'PENDENTE') {
            throw new Error('O pedido já foi enviado ou finalizado.');
        }

        return await pedido.update({ 
            status: 'EM_PREPARO' 
        });
    }

}

module.exports = new PedidoService();