// src/services/ItemCardapioService.js
const { ItemCardapio, Sequelize } = require('../models');
const Op = Sequelize.Op;

class ItemCardapioService {

    async criar(dados) {
        // Regra simples: não permitir itens com preço negativo
        if (dados.preco < 0) throw new Error("O preço não pode ser negativo.");
        return await ItemCardapio.create(dados);
    }

    async listarTodos(categoria) {
        const where = {};
        if (categoria) {
            where.categoria = categoria;
        }
        return await ItemCardapio.findAll({ where });
    }

    async listarDisponiveis() {
        return await ItemCardapio.findAll({
            where: {
                disponivelNaCozinha: true
            }
        });
    }

    async atualizar(id, dados) {
        const item = await ItemCardapio.findByPk(id);
        if (!item) throw new Error('Item não encontrado');

        return await item.update(dados);
    }
    
    // Método auxiliar caso queira pegar um específico
    async buscarPorId(id) {
        return await ItemCardapio.findByPk(id);
    }
}

module.exports = new ItemCardapioService();