// src/routes/caixaRoutes.js

const express = require('express');
const router = express.Router();
const CaixaController = require('../controllers/CaixaController');

// 6. Caixa & Pagamento

// GET /caixa/contas/abertas
// Lista contas que pediram fechamento (AGUARDANDO_PAGAMENTO)
router.get('/contas/abertas', CaixaController.listarContasAbertas);

// POST /caixa/pagamentos
// Processa o pagamento efetivo (baixa no sistema)
router.post('/pagamentos', CaixaController.processarPagamento);

// GET /caixa/formas-pagamento
// Lista as formas de pagamento válidas (Pix, Crédito, VR, etc. dependendo do ENUM)
router.get('/formas-pagamento', CaixaController.listarFormasPagamento);

module.exports = router;
