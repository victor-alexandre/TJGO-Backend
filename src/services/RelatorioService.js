// src/services/RelatorioService.js
const { Conta, Pagamento, Pedido, ItemPedido, ItemCardapio, sequelize } = require('../models');
const { Op } = require('sequelize');

class RelatorioService {

    async vendasDiarias(dataString) {
        // Ajuste UTC para data
        const [ano, mes, dia] = dataString.split('-').map(Number);
        const inicioDia = new Date(Date.UTC(ano, mes - 1, dia, 0, 0, 0, 0));
        const fimDia = new Date(Date.UTC(ano, mes - 1, dia, 23, 59, 59, 999));

        // Busca contas PAGAS que tiveram pedidos nesse dia
        const contas = await Conta.findAll({
            where: {
                status: 'PAGA', // Filtro direto pelo status da conta
            },
            include: [
                {
                    model: Pedido,
                    required: true, // Garante que a conta teve movimentação nesse dia
                    where: {
                        horarioPedido: { [Op.between]: [inicioDia, fimDia] }
                    },
                    attributes: [] // Não precisamos trazer os dados do pedido, só usar no filtro
                }
            ]
        });

        // Soma simples usando JavaScript (ou poderia usar Conta.sum do Sequelize)
        const totalVendas = contas.reduce((acc, conta) => acc + conta.valorFinal, 0);

        return {
            data: dataString,
            totalVendas: parseFloat(totalVendas.toFixed(2)),
            quantidadeVendas: contas.length
        };
    }

    async vendasPorFormaPagamento(dataString) {
        const [ano, mes, dia] = dataString.split('-').map(Number);
        const inicioDia = new Date(Date.UTC(ano, mes - 1, dia, 0, 0, 0, 0));
        const fimDia = new Date(Date.UTC(ano, mes - 1, dia, 23, 59, 59, 999));

        const contas = await Conta.findAll({
            where: { status: 'PAGA' },
            include: [
                {
                    model: Pagamento,
                    required: true,
                    attributes: ['tipo'] // Só precisamos do tipo
                },
                {
                    model: Pedido,
                    where: { horarioPedido: { [Op.between]: [inicioDia, fimDia] } },
                    attributes: []
                }
            ]
        });

        const resumo = contas.reduce((acc, conta) => {
            const tipo = conta.Pagamento ? conta.Pagamento.tipo : 'Outros';
            if (!acc[tipo]) acc[tipo] = 0;

            acc[tipo] += conta.valorFinal;
            return acc;
        }, {});

        const totalGeral = Object.values(resumo).reduce((a, b) => a + b, 0);

        return {
            data: dataString,
            resumoPorPagamento: resumo,
            totalGeral: parseFloat(totalGeral.toFixed(2))
        };
    }

    async vendasMensais(mes, ano) {
        const inicioMes = new Date(Date.UTC(ano, mes - 1, 1, 0, 0, 0, 0));
        const fimMes = new Date(Date.UTC(ano, mes, 0, 23, 59, 59, 999));

        const contas = await Conta.findAll({
            where: {
                status: 'PAGA',
            },
            include: [
                {
                    model: Pedido,
                    required: true,
                    where: {
                        horarioPedido: { [Op.between]: [inicioMes, fimMes] }
                    },
                    attributes: []
                }
            ]
        });

        const totalVendas = contas.reduce((acc, conta) => acc + conta.valorFinal, 0);

        return {
            mes: Number(mes),
            ano: Number(ano),
            totalVendas: parseFloat(totalVendas.toFixed(2)),
            quantidadeVendas: contas.length
        };
    }

    async itensMaisPedidos() {
        const itens = await ItemPedido.findAll({
            attributes: [
                'itemCardapioId',
                [sequelize.fn('SUM', sequelize.col('quantidade')), 'totalVendido']
            ],
            include: [
                {
                    model: ItemCardapio,
                    attributes: ['nome', 'preco', 'categoria']
                }
            ],
            group: ['itemCardapioId'],
            order: [[sequelize.literal('totalVendido'), 'DESC']],
            limit: 5
        });

        return itens.map(item => ({
            nome: item.ItemCardapio ? item.ItemCardapio.nome : 'Item Removido',
            categoria: item.ItemCardapio ? item.ItemCardapio.categoria : 'N/A',
            totalVendido: item.dataValues.totalVendido
        }));
    }
}

module.exports = new RelatorioService();