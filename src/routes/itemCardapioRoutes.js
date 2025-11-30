// src/routes/itemCardapioRoutes.js
const express = require('express');
const ItemCardapioController = require('../controllers/ItemCardapioController');

const router = express.Router();

// Ordem importa: rotas específicas (como /disponiveis) devem vir antes das parametrizadas (/:id)
router.get('/disponiveis', ItemCardapioController.listarDisponiveis);

router.post('/', ItemCardapioController.criar);
router.get('/', ItemCardapioController.listar);
router.put('/:id', ItemCardapioController.atualizar);

module.exports = router;