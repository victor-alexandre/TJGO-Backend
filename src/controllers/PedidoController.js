// src/controllers/PedidoController.js

const PedidoService = require('../services/PedidoService');

// PedidoController é a camada de entrada e saída. Recebe requisições HTTP e 
// envia respostas, delegando toda a lógica de negócio para o PedidoService.

class PedidoController {

    // [GET /pedidos] - Rota para listar todos os pedidos
    async listar(req, res) {
        try {
            const pedidos = await PedidoService.listarTodos();
            res.status(200).json(pedidos);

        } catch (error) {
            console.error('Erro no Controller ao listar pedidos:', error);
            res.status(500).json({ error: 'Erro interno ao buscar pedidos.' });
        }
    }

    // [POST /pedidos] - Rota para criar um novo pedido
    async criar(req, res) {
        const { contaId, clienteId, itens } = req.body;

        if (!contaId || !clienteId || !itens || itens.length === 0) {
            return res.status(400).json({ error: 'Dados de pedido incompletos.' });
        }

        try {
            const novoPedido = await PedidoService.criarPedido(contaId, clienteId, itens);
            res.status(201).json({
                message: 'Pedido criado com sucesso!',
                pedido: novoPedido
            });

        } catch (error) {
            console.error('Erro no Controller ao criar pedido:', error); // Log completo

            // Tratamento para Conta/Cliente não encontrados (Erro de chave estrangeira)
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(404).json({ 
                    error: 'Dados inválidos: Cliente, Conta ou Item do cardápio não encontrados no banco de dados.' 
                });
            }

            if (error.message.includes('não encontrada')) {
                return res.status(404).json({ error: error.message });
            }

            res.status(500).json({ error: 'Erro ao processar pedido.', details: error.message });
        }
    }

    // [PUT /pedidos/:id] - Atualiza pedido
    async atualizar(req, res) {
        const { id } = req.params;
        const dados = req.body;

        try {
            const pedidoAtualizado = await PedidoService.atualizar(id, dados);
            res.status(200).json({
                message: 'Pedido atualizado com sucesso.',
                pedido: pedidoAtualizado
            });
        } catch (error) {
            if (error.message === 'Pedido não encontrado') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: 'Erro ao atualizar pedido.' });
        }
    }

    // [DELETE /pedidos/:id] - Cancela/Remove pedido
    async remover(req, res) {
        const { id } = req.params;

        try {
            await PedidoService.remover(id);
            res.status(200).json({ message: 'Pedido cancelado/removido com sucesso.' });
        } catch (error) {
            if (error.message === 'Pedido não encontrado') {
                return res.status(404).json({ error: error.message });
            }
            if (error.message.includes('Não é possível cancelar')) {
                return res.status(409).json({ error: error.message });
            }
            res.status(500).json({ error: 'Erro ao remover pedido.' });
        }
    }

    // [POST /pedidos/:id/enviar-cozinha] - Envia para preparo
    async enviarCozinha(req, res) {
        const { id } = req.params;

        try {
            const pedido = await PedidoService.enviarParaCozinha(id);
            res.status(200).json({
                message: 'Pedido enviado para a cozinha!',
                status: pedido.status
            });
        } catch (error) {
            if (error.message === 'Pedido não encontrado') {
                return res.status(404).json({ error: error.message });
            }
            if (error.message.includes('já foi enviado')) {
                return res.status(409).json({ error: error.message });
            }
            res.status(500).json({ error: 'Erro ao enviar pedido.' });
        }
    }
}

module.exports = new PedidoController();