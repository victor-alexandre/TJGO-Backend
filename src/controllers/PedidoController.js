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
            // Em caso de erro não esperado (ex: falha no banco), retorna 500
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
            console.error('Erro no Controller ao criar pedido:', error.message);

            if (error.message.includes('não encontrada')) {
                return res.status(404).json({ error: error.message });
            }

            res.status(500).json({ error: 'Erro ao processar pedido.' });
        }
    }
}

module.exports = new PedidoController();