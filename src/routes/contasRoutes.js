// src/routes/contasRoutes.js
const express = require('express');
const router = express.Router();
const ContaController = require('../controllers/ContaController');

// Rotas de Conta (Mesa & Conta)
// Como o prefixo /contas já está no index.js, aqui ficam só os complementos:
router.get('/:mesaId/resumo', ContaController.getResumo);
router.post('/:id/dividir', ContaController.dividir);
router.post('/:id/fechamento', ContaController.fechamento);
router.post('/:id/desconto', ContaController.aplicarDesconto);

module.exports = router;
