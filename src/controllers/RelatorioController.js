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

    async vendasMensais(req, res) {
        try {
            // Pega mês/ano da query ou usa a data atual como padrão
            const hoje = new Date();
            const mes = req.query.mes || (hoje.getMonth() + 1);
            const ano = req.query.ano || hoje.getFullYear();

            const relatorio = await RelatorioService.vendasMensais(mes, ano);
            return res.json(relatorio);
        } catch (error) {
            console.error('Erro no Controller ao gerar relatório mensal:', error);
            return res.status(500).json({ error: 'Erro ao gerar relatório mensal.' });
        }
    }

    async itensMaisPedidos(req, res) {
        try {
            const ranking = await RelatorioService.itensMaisPedidos();
            return res.json(ranking);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao gerar ranking de itens.' });
        }
    }
}

module.exports = new RelatorioController();