// src/routes/pedidosRoutes.js
const express = require("express");
const PedidoController = require("../controllers/PedidoController");
const router = express.Router();

// Rotas principais de Pedido
router.post("/", PedidoController.criar);
router.get("/", PedidoController.listar);
router.put("/:id", PedidoController.atualizar);
router.delete("/:id", PedidoController.remover);
router.post("/:id/enviar-cozinha", PedidoController.enviarCozinha);

// Sub-recursos: Itens e Adicionais
router.post("/:id/itens", PedidoController.adicionarItem);

router.post("/:id/adicionais", PedidoController.adicionarAdicional);
router.put("/:id/adicionais/:addId", PedidoController.atualizarAdicional);
router.delete("/:id/adicionais/:addId", PedidoController.removerAdicional);

module.exports = router;