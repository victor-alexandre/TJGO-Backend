// src/controllers/ItemCardapioController.js
const ItemCardapioService = require('../services/ItemCardapioService');

class ItemCardapioController {

    // [POST /itens-cardapio]
    async criar(req, res) {
        try {
            const { nome, preco, descricao, categoria } = req.body;
            
            if (!nome || !preco) {
                return res.status(400).json({ error: 'Nome e Preço são obrigatórios.' });
            }

            const item = await ItemCardapioService.criar({ nome, preco, descricao, categoria });
            return res.status(201).json(item);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // [GET /itens-cardapio] - Com filtro opcional ?categoria=Bebida
    async listar(req, res) {
        try {
            const { categoria } = req.query;
            const itens = await ItemCardapioService.listarTodos(categoria);
            return res.status(200).json(itens);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar itens.' });
        }
    }

    // [GET /itens-cardapio/disponiveis]
    async listarDisponiveis(req, res) {
        try {
            const itens = await ItemCardapioService.listarDisponiveis();
            return res.status(200).json(itens);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar itens disponíveis.' });
        }
    }

    // [PUT /itens-cardapio/:id]
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;
            
            const itemAtualizado = await ItemCardapioService.atualizar(id, dados);
            return res.status(200).json(itemAtualizado);
        } catch (error) {
            if (error.message === 'Item não encontrado') {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ItemCardapioController();