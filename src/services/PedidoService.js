// src/services/PedidoService.js

const { Pedido, ItemPedido, Mesa, Conta, ItemCardapio, Adicional, ItemPedidoAdicional } = require('../models');

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
                    model: ItemPedido,
                    as: 'linhasDoPedido',
                    attributes: ['id', 'quantidade'],

                    include: [
                        {
                            model: ItemCardapio,
                            attributes: ['nome', 'preco']
                        },
                        {
                            model: Adicional,
                            as: 'adicionaisDoItem',
                            through: { model: ItemPedidoAdicional, attributes: ['quantidade'] },
                            attributes: ['nome', 'precoExtra']
                        }
                    ]
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

    async adicionarItemAoPedido(pedidoId, itens) {
        const pedido = await Pedido.findByPk(pedidoId);
        if (!pedido) throw new Error('Pedido não encontrado');

        if (pedido.status !== 'PENDENTE') {
            throw new Error('Não é possível adicionar itens a um pedido que já está em preparo.');
        }

        const itemPedidos = itens.map(item => ({
            pedidoId: pedidoId,
            itemCardapioId: item.itemCardapioId,
            quantidade: item.quantidade
        }));

        const resultados = await ItemPedido.bulkCreate(itemPedidos);
        console.log(`[PedidoService]: ${resultados.length} itens adicionados ao Pedido #${pedidoId}`);
        return resultados;
    }

    async adicionarAdicionalAoItem(pedidoId, itemPedidoId, adicionais) {
        const pedido = await Pedido.findByPk(pedidoId);
        const itemPedido = await ItemPedido.findByPk(itemPedidoId);

        if (!pedido || !itemPedido || itemPedido.pedidoId != pedidoId) {
            throw new Error('Pedido ou Item de Pedido não encontrado para esta requisição.');
        }

        if (pedido.status !== 'PENDENTE') {
            throw new Error('Não é possível modificar itens de um pedido que já está em preparo.');
        }

        const adicionaisParaInserir = adicionais.map(adicional => ({
            itemPedidoId: itemPedidoId,
            adicionalId: adicional.adicionalId,
            quantidade: adicional.quantidade || 1
        }));

        const idsAdicionais = adicionaisParaInserir.map(a => a.adicionalId);
        const adicionaisExistentes = await Adicional.count({ where: { id: idsAdicionais } });
        if (adicionaisExistentes !== idsAdicionais.length) {
            throw new Error('Um ou mais IDs de Adicionais não são válidos.');
        }

        const resultados = await ItemPedidoAdicional.bulkCreate(adicionaisParaInserir);
        console.log(`[PedidoService]: ${resultados.length} adicionais inseridos no ItemPedido #${itemPedidoId}`);
        return resultados;
    }

    async atualizarAdicional(adicionalPedidoId, novaQuantidade) {
        const adicionalRegistro = await ItemPedidoAdicional.findByPk(adicionalPedidoId);

        if (!adicionalRegistro) {
            throw new Error('Registro de Adicional não encontrado.');
        }

        adicionalRegistro.quantidade = novaQuantidade;
        return await adicionalRegistro.save();
    }

    async removerAdicional(adicionalPedidoId) {
        const resultado = await ItemPedidoAdicional.destroy({
            where: { id: adicionalPedidoId }
        });

        if (resultado === 0) {
            throw new Error('Registro de Adicional não encontrado para remoção.');
        }
        return resultado;
    }

}

module.exports = new PedidoService();