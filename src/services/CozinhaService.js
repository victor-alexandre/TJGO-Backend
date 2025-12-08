const { Pedido, Conta, Mesa, ItemPedido, ItemCardapio } = require('../models');

class CozinhaService {

    // Lista todos os pedidos pendentes (status NOVO ou EM_ESPERA)
    async listarPendentes() {
        return Pedido.findAll({
            where: {
                status: ['PENDENTE', 'EM_PREPARACAO']
            },
            include: [
                { model: Conta, attributes: ['nome'], include: [{ model: Mesa, attributes: ['numero'] }] },
                {
                    model: ItemPedido,
                    as: 'linhasDoPedido',
                    attributes: ['id', 'quantidade'],
                    include: [{ model: ItemCardapio, attributes: ['nome', 'preco'] }]
                }
            ]
        });
    }

    // Marca o pedido como EM_PREPARACAO
    async iniciarPedido(id) {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) throw new Error('Pedido não encontrado');

        if (pedido.status === 'EM_PREPARACAO') {
            return pedido;
        }

        if (pedido.status == 'PENDENTE') {
            pedido.status = 'EM_PREPARACAO';
        }
        else {
            throw new Error('Pedido não pode ser iniciado neste status');
        }
        return await pedido.save();
    }

    // Marca o pedido como PRONTO
    async pedidoPronto(id) {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) throw new Error('Pedido não encontrado');

        if (pedido.status !== 'EM_PREPARACAO') {
            throw new Error('Pedido não está em preparação');
        }

        pedido.status = 'PRONTO';
        return await pedido.save();
    }

    // Marca o pedido como ENTREGUE
    async entregarPedido(id) {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) throw new Error('Pedido não encontrado');

        if (pedido.status !== 'PRONTO') {
            throw new Error('Pedido não está pronto para entrega');
        }

        pedido.status = 'ENTREGUE';
        pedido.horarioEntrega = new Date();
        return await pedido.save();
    }
}

module.exports = new CozinhaService();
