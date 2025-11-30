// src/services/ItemCardapioService.js

const { ItemCardapio } = require('../models');

class ItemCardapioService {

    async criar(dados) {
        if (dados.preco < 0) throw new Error("O preço não pode ser negativo.");
        return await ItemCardapio.create(dados);
    }

    async listarTodos(categoria) {
        const where = {};
        
        // Se tiver categoria, faz filtro exato (igualdade)
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
    
    async buscarPorId(id) {
        return await ItemCardapio.findByPk(id);
    }
}

module.exports = new ItemCardapioService();