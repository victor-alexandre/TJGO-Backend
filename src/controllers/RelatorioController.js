// src/controllers/RelatorioController.js
const RelatorioService = require('../services/RelatorioService');

class RelatorioController {

    async vendasDiarias(req, res) {
        try {
            // Pega data da query string ou usa a data de hoje
            const data = req.query.data || new Date().toISOString().split('T')[0];
            
            const relatorio = await RelatorioService.vendasDiarias(data);
            return res.json(relatorio);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao gerar relatório diário.' });
        }
    }

    async porFormaPagamento(req, res) {
        try {
            const data = req.query.data || new Date().toISOString().split('T')[0];
            
            const relatorio = await RelatorioService.vendasPorFormaPagamento(data);
            return res.json(relatorio);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao gerar relatório por pagamento.' });
        }
    }
}

module.exports = new RelatorioController();