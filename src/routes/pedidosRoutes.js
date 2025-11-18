// src/routes/pedidosRoutes.js

const express = require('express');
const PedidoController = require('../controllers/PedidoController');
const router = express.Router();

// Mapeamento das rotas para a entidade Pedido.

// POST / (que se tornará /pedidos) - Cria um novo pedido
router.post('/', PedidoController.criar);

// GET / (que se tornará /pedidos) - Lista todos os pedidos
router.get('/', PedidoController.listar);

module.exports = router;