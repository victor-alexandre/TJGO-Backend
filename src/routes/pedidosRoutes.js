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

// --- ROTAS ---

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

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualiza dados de um pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               horarioEntrega:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Pedido atualizado
 *       404:
 *         description: Pedido não encontrado
 */
router.put("/:id", PedidoController.atualizar);

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Cancela um pedido (se ainda não enviado à cozinha)
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido cancelado com sucesso
 *       409:
 *         description: Conflito - Não é possível cancelar pedido já em preparo
 *       404:
 *         description: Pedido não encontrado
 */
router.delete("/:id", PedidoController.remover);

/**
 * @swagger
 * /pedidos/{id}/enviar-cozinha:
 *   post:
 *     summary: Envia o pedido para a cozinha (Muda status para EM_PREPARO)
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido enviado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
router.post("/:id/enviar-cozinha", PedidoController.enviarCozinha);

router.post("/:id/itens", PedidoController.adicionarItem);
router.post("/:id/adicionais", PedidoController.adicionarAdicional);
router.put("/:id/adicionais/:addId", PedidoController.atualizarAdicional);
router.delete("/:id/adicionais/:addId", PedidoController.removerAdicional);

module.exports = router;
