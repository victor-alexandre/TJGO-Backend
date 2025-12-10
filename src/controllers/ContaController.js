// src/controllers/ContaController.js
const ContaService = require('../services/ContaService');

// ContaController é a camada de entrada e saída para as rotas de Mesa & Conta
class ContaController {
    // [GET /contas/:mesaId/resumo] - Consulta o resumo da conta de uma mesa (pré-conta)
    async getResumo(req, res) {
        const { mesaId } = req.params;
        try {
            const resumo = await ContaService.getResumoPorMesa(mesaId);
            res.status(200).json(resumo);
        } catch (error) {
            console.error('Erro no Controller ao buscar resumo da conta:', error);
            // Captura o statusCode definido no Service (ex: 404) ou usa 500
            const status = error.statusCode || 500;
            res.status(status).json({ error: error.message });
        }
    }

    // [POST /contas/:id/dividir] - Simula a divisão da conta entre N pessoas
    async dividir(req, res) {
        const { id } = req.params;
        const { pessoas } = req.body;

        if (!pessoas || pessoas <= 0) {
            return res.status(400).json({ error: 'Número de pessoas deve ser maior que zero.' });
        }

        try {
            const resultado = await ContaService.dividirConta(id, pessoas);
            res.status(200).json(resultado);
        } catch (error) {
            console.error('Erro no Controller ao dividir conta:', error);
            const status = error.statusCode || 500;
            res.status(status).json({ error: 'Erro ao dividir conta.', details: error.message });
        }
    }

    // [POST /contas/:id/desconto] - Aplica desconto (fixo ou percentual) na conta
    async aplicarDesconto(req, res) {
        const { id } = req.params;
        const { tipo, valor } = req.body;

        if (!tipo || !['VALOR', 'PERCENTUAL'].includes(tipo)) {
            return res.status(400).json({ error: 'Tipo de desconto inválido. Use VALOR ou PERCENTUAL.' });
        }

        if (!valor || valor <= 0) {
            return res.status(400).json({ error: 'Valor do desconto deve ser maior que zero.' });
        }

        try {
            const conta = await ContaService.aplicarDesconto(id, { tipo, valor });
            res.status(200).json({
                message: 'Desconto aplicado com sucesso.',
                conta
            });
        } catch (error) {
            console.error('Erro no Controller ao aplicar desconto:', error);
            const status = error.statusCode || 500;
            
            // mensagens personalizadas para 409 se necessário
            if (error.message.includes('Não é possível aplicar desconto') || error.message.includes('não pode ser maior')) {
                 return res.status(409).json({ error: error.message });
            }

            res.status(status).json({ error: 'Erro ao aplicar desconto.', details: error.message });
        }
    }

    // [POST /contas/:id/fechamento] - Solicita o fechamento da conta (envia para o caixa)
    async fechamento(req, res) {
        const { id } = req.params;
        try {
            const conta = await ContaService.solicitarFechamento(id);
            res.status(200).json({
                message: 'Conta enviada para o caixa.',
                conta
            });
        } catch (error) {
            console.error('Erro no Controller ao fechar conta:', error);
            
            // Se o Service lançou erro com statusCode (400 ou 404)
            const status = error.statusCode || 500;
            
            if (status === 409) {
                return res.status(409).json({ error: error.message });
            }

            if (error.message.includes('não encontrada')) {
                return res.status(404).json({ error: error.message });
            }
            
            res.status(status).json({ error: 'Erro ao fechar conta.', details: error.message });
        }
    }
}

module.exports = new ContaController();