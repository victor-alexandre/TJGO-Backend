// src/services/RelatorioService.js
const { 
    Pedido, Conta, Pagamento, ItemPedido, ItemCardapio, 
    ItemPedidoAdicional, Adicional, Sequelize 
} = require('../models');
const { Op } = require('sequelize');

class RelatorioService {

    // Método auxiliar para calcular o total de uma lista de contas
    // Isso evita duplicar código entre os dois relatórios
    async _calcularTotalContas(contas) {
        let totalGeral = 0;
        let detalhado = [];

        for (const conta of contas) {
            let totalConta = 0;

            // Percorre os pedidos da conta para somar itens
            if (conta.Pedidos) {
                for (const pedido of conta.Pedidos) {
                    if (pedido.linhasDoPedido) {
                        for (const linha of pedido.linhasDoPedido) {
                            // Preço base do item * quantidade
                            const precoItem = linha.ItemCardapio ? linha.ItemCardapio.preco : 0;
                            let subtotalLinha = precoItem * linha.quantidade;

                            // Soma os adicionais (bacon, etc)
                            if (linha.adicionaisDoItem) {
                                for (const adicional of linha.adicionaisDoItem) {
                                    // A tabela pivot ItemPedidoAdicional tem a quantidade do adicional
                                    const qtdAdicional = adicional.ItemPedidoAdicional.quantidade;
                                    const precoAdicional = adicional.precoExtra;
                                    subtotalLinha += (precoAdicional * qtdAdicional);
                                }
                            }
                            totalConta += subtotalLinha;
                        }
                    }
                }
            }

            totalGeral += totalConta;
            
            // Só adiciona ao detalhado se houver pagamento registrado
            if (conta.Pagamento) {
                detalhado.push({
                    contaId: conta.id,
                    formaPagamento: conta.Pagamento.tipo,
                    valor: parseFloat(totalConta.toFixed(2))
                });
            }
        }

        return { totalGeral: parseFloat(totalGeral.toFixed(2)), detalhado };
    }

    async vendasDiarias(dataString) {
        // Define o intervalo do dia (00:00:00 até 23:59:59)
        const inicioDia = new Date(dataString);
        inicioDia.setHours(0, 0, 0, 0);
        
        const fimDia = new Date(dataString);
        fimDia.setHours(23, 59, 59, 999);

        // Busca Contas que tiveram Pedidos nesse dia e que JÁ FORAM PAGAS (tem Pagamento)
        const contas = await Conta.findAll({
            include: [
                {
                    model: Pagamento,
                    required: true // Só traz contas que têm pagamento (venda efetivada)
                },
                {
                    model: Pedido,
                    where: {
                        horarioPedido: {
                            [Op.between]: [inicioDia, fimDia]
                        }
                    },
                    include: [
                        {
                            model: ItemPedido,
                            as: 'linhasDoPedido',
                            include: [
                                { model: ItemCardapio }, // Para pegar o preço do item
                                { 
                                    model: Adicional,
                                    as: 'adicionaisDoItem' // Para pegar o preço do adicional
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        const dados = await this._calcularTotalContas(contas);
        
        return {
            data: dataString,
            totalVendas: dados.totalGeral,
            quantidadeVendas: contas.length
        };
    }

    async vendasPorFormaPagamento(dataString) {
        // Reutiliza a lógica de busca do vendasDiarias para garantir consistência
        // Mas agora vamos agrupar o resultado
        
        const inicioDia = new Date(dataString);
        inicioDia.setHours(0, 0, 0, 0);
        const fimDia = new Date(dataString);
        fimDia.setHours(23, 59, 59, 999);

        const contas = await Conta.findAll({
            include: [
                { model: Pagamento, required: true },
                {
                    model: Pedido,
                    where: { horarioPedido: { [Op.between]: [inicioDia, fimDia] } },
                    include: [{
                        model: ItemPedido,
                        as: 'linhasDoPedido',
                        include: [
                            { model: ItemCardapio },
                            { model: Adicional, as: 'adicionaisDoItem' }
                        ]
                    }]
                }
            ]
        });

        const dados = await this._calcularTotalContas(contas);

        // Agrupamento por tipo de pagamento (Pix, Crédito, etc.)
        const resumo = dados.detalhado.reduce((acc, item) => {
            if (!acc[item.formaPagamento]) {
                acc[item.formaPagamento] = 0;
            }
            acc[item.formaPagamento] += item.valor;
            return acc;
        }, {});

        return {
            data: dataString,
            resumoPorPagamento: resumo,
            totalGeral: dados.totalGeral
        };
    }
}

module.exports = new RelatorioService();