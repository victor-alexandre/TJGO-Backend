const CozinhaService = require('../services/CozinhaService');

// CozinhaController é a camada de entrada e saída para as rotas de KDS (Cozinha)
class CozinhaController {

    // [GET /cozinha/pedidos/pendentes] - Lista todos os pedidos pendentes
    async listarPendentes(req, res) {
        try {
            const pedidos = await CozinhaService.listarPendentes();
            res.status(200).json(pedidos);
        } catch (error) {
            console.error('Erro no Controller ao listar pedidos pendentes:', error);
            res.status(500).json({ error: 'Erro interno ao buscar pedidos pendentes.' });
        }
    }

    // [PATCH /cozinha/pedidos/:id/iniciar] - Marca pedido como EM_PREPARACAO
    async iniciarPedido(req, res) {
        const { id } = req.params;
        try {
            const pedido = await CozinhaService.iniciarPedido(id);
            res.status(200).json({ message: 'Pedido iniciado', pedido });
        } catch (error) {
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ error: error.message });
            }
            if (error.message.includes('não pode ser iniciado')) {
                return res.status(409).json({ error: error.message });
            }
            res.status(500).json({ error: 'Erro ao iniciar pedido.', details: error.message });
        }
    }

    // [PATCH /cozinha/pedidos/:id/pronto] - Marca pedido como PRONTO
    async pedidoPronto(req, res) {
        const { id } = req.params;
        try {
            const pedido = await CozinhaService.pedidoPronto(id);
            res.status(200).json({ message: 'Pedido pronto para entrega', pedido });
        } catch (error) {
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ error: error.message });
            }
            if (error.message.includes('não está em preparação')) {
                return res.status(409).json({ error: error.message });
            }
            res.status(500).json({ error: 'Erro ao marcar pedido como pronto.', details: error.message });
        }
    }

    // [PATCH /cozinha/pedidos/:id/entregar] - Marca pedido como ENTREGUE
    async entregarPedido(req, res) {
        const { id } = req.params;
        try {
            const pedido = await CozinhaService.entregarPedido(id);
            res.status(200).json({ message: 'Pedido entregue ao cliente', pedido });
        } catch (error) {
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ error: error.message });
            }
            if (error.message.includes('não está pronto')) {
                return res.status(409).json({ error: error.message });
            }
            res.status(500).json({ error: 'Erro ao entregar pedido.', details: error.message });
        }
    }
}

module.exports = new CozinhaController();
