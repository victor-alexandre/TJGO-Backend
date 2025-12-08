// src/routes/relatorioRoutes.js
const express = require('express');
const RelatorioController = require('../controllers/RelatorioController');

const router = express.Router();

router.get('/vendas-diarias', RelatorioController.vendasDiarias);
router.get('/por-forma-pagamento', RelatorioController.porFormaPagamento);
router.get('/vendas-mensais', RelatorioController.vendasMensais);
router.get('/itens-mais-pedidos', RelatorioController.itensMaisPedidos);

module.exports = router;