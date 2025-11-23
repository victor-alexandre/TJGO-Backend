// src/routes/pedidosRoutes.js

const express = require("express");
const PedidoController = require("../controllers/PedidoController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemPedidoInput:
 *       type: object
 *       required:
 *         - itemCardapioId
 *         - quantidade
 *       properties:
 *         itemCardapioId:
 *           type: integer
 *           description: ID do item do cardápio
 *         quantidade:
 *           type: integer
 *           description: Quantidade do item
 *
 *     PedidoInput:
 *       type: object
 *       required:
 *         - contaId
 *         - clienteId
 *         - itens
 *       properties:
 *         contaId:
 *           type: integer
 *         clienteId:
 *           type: integer
 *         itens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemPedidoInput'
 *       example:
 *         contaId: 1
 *         clienteId: 5
 *         itens:
 *           - itemCardapioId: 10
 *             quantidade: 2
 *
 *     Pedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         status:
 *           type: string
 *         horarioPedido:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   - name: Pedidos
 *     description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoInput'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Dados incompletos
 *       500:
 *         description: Erro no servidor
 */
router.post("/", PedidoController.criar);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 */
router.get("/", PedidoController.listar);

module.exports = router;
