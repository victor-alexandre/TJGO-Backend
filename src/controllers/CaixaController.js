// src/controllers/CaixaController.js

const CaixaService = require('../services/CaixaService');

class CaixaController {
  // GET /caixa/contas/abertas
  static async listarContasAbertas(req, res) {
    try {
      const result = await CaixaService.listarContasAbertas();
      return res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao listar contas abertas:', error);
      const status = error.statusCode || 500;
      return res.status(status).json({
        error: error.message || 'Erro ao listar contas abertas'
      });
    }
  }

  // GET /caixa/formas-pagamento
  static async listarFormasPagamento(req, res) {
    try {
      const formas = await CaixaService.listarFormasPagamento();
      return res.status(200).json(formas);
    } catch (error) {
      console.error('Erro ao listar formas de pagamento:', error);
      const status = error.statusCode || 500;
      return res.status(status).json({
        error: error.message || 'Erro ao listar formas de pagamento'
      });
    }
  }

  // POST /caixa/pagamentos
  static async processarPagamento(req, res) {
    try {
      const { contaId, tipo, valorPago, nro_transacao, numero_cheque } = req.body;

      const result = await CaixaService.processarPagamento({
        contaId,
        tipo,
        valorPago,
        nro_transacao,
        numero_cheque
      });

      return res.status(200).json({
        message: 'Pagamento processado com sucesso.',
        ...result
      });
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      const status = error.statusCode || 500;
      return res.status(status).json({
        error: error.message || 'Erro ao processar pagamento'
      });
    }
  }
}

module.exports = CaixaController;
