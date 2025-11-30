const express = require('express');
const router = express.Router();
const CozinhaController = require('../controllers/CozinhaController');

// Rotas de Cozinha (KDS)
router.get('/pedidos/pendentes', CozinhaController.listarPendentes);
router.patch('/pedidos/:id/iniciar', CozinhaController.iniciarPedido);
router.patch('/pedidos/:id/pronto', CozinhaController.pedidoPronto);
router.patch('/pedidos/:id/entregar', CozinhaController.entregarPedido);

module.exports = router;
