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

        const novoPedido = await Pedido.create({
            contaId,
            clienteId,
            status: 'Preparando'
        });

        const itemPedidos = itens.map(item => ({
            pedidoId: novoPedido.numero,
            itemCardapioId: item.id,
            quantidade: item.quantidade
        }));

        await ItemPedido.bulkCreate(itemPedidos);

        console.log(`[PedidoService]: Novo Pedido #${novoPedido.numero} para a Conta: ${conta.nome}`);

        return novoPedido;
    }

}

module.exports = new PedidoService();