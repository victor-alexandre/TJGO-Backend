// src/routes/relatorioRoutes.js
const express = require('express');
const RelatorioController = require('../controllers/RelatorioController');

const router = express.Router();

router.get('/vendas-diarias', RelatorioController.vendasDiarias);
router.get('/por-forma-pagamento', RelatorioController.porFormaPagamento);

module.exports = router;