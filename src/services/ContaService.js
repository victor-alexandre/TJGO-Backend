// src/services/ContaService.js
const { Mesa, Conta, Pedido, ItemPedido, ItemCardapio } = require('../models');

class ContaService {
  /**
   * Calcula os valores da conta com base nos pedidos e itens
   */
  static async calcularValoresDaConta(conta) {
    // Buscar todos os pedidos da conta com seus itens
    const pedidos = await Pedido.findAll({
      where: { contaId: conta.id },
      include: [
        {
          model: ItemPedido,
          as: 'linhasDoPedido',
          include: [
            {
              model: ItemCardapio,
              attributes: ['id', 'nome', 'preco']
            }
          ]
        }
      ]
    });

    // Calcular valor bruto (soma de todos os itens)
    let valorBruto = 0;
    pedidos.forEach(pedido => {
      pedido.linhasDoPedido.forEach(item => {
        const subtotal = item.quantidade * item.ItemCardapio.preco;
        valorBruto += subtotal;
      });
    });

    // Aplicar desconto
    let descontoAplicado = 0;
    if (conta.descontoPercentual > 0) {
      descontoAplicado = valorBruto * (conta.descontoPercentual / 100);
    } else if (conta.descontoValor > 0) {
      descontoAplicado = conta.descontoValor;
    }

    const valorFinal = Math.max(valorBruto - descontoAplicado, 0);

    return {
      valorBruto,
      descontoAplicado,
      valorFinal,
      pedidos
    };
  }

  /**
   * GET /contas/:mesaId/resumo
   * Retorna o resumo da conta de uma mesa (pré-conta)
   */
  static async getResumoPorMesa(mesaId) {
    // Verificar se a mesa existe
    const mesa = await Mesa.findByPk(mesaId);
    if (!mesa) {
      const error = new Error('Mesa não encontrada');
      error.statusCode = 404;
      throw error;
    }

    // Buscar conta da mesa
    const conta = await Conta.findOne({
      where: { mesaId },
      include: [
        {
          model: Pedido,
          include: [
            {
              model: ItemPedido,
              as: 'linhasDoPedido',
              include: [
                {
                  model: ItemCardapio,
                  attributes: ['id', 'nome', 'preco', 'descricao']
                }
              ]
            }
          ]
        }
      ]
    });

    if (!conta) {
      const error = new Error('Nenhuma conta aberta para esta mesa');
      error.statusCode = 404;
      throw error;
    }

    // Calcular valores
    const { valorBruto, descontoAplicado, valorFinal, pedidos } = 
      await this.calcularValoresDaConta(conta);

    // Atualizar conta com valores calculados
    await conta.update({
      valorBruto,
      descontoValor: descontoAplicado,
      valorFinal
    });

    // Montar resumo detalhado
    const itensPorPedido = pedidos.map(pedido => ({
      pedidoId: pedido.id,
      status: pedido.status,
      itens: pedido.linhasDoPedido.map(item => ({
        nome: item.ItemCardapio.nome,
        descricao: item.ItemCardapio.descricao,
        quantidade: item.quantidade,
        precoUnitario: item.ItemCardapio.preco,
        subtotal: item.quantidade * item.ItemCardapio.preco
      }))
    }));

    return {
      mesaId: mesa.id,
      numeroMesa: mesa.numero,
      contaId: conta.id,
      status: conta.status,
      pedidos: itensPorPedido,
      resumo: {
        valorBruto,
        descontoValor: conta.descontoValor,
        descontoPercentual: conta.descontoPercentual,
        valorFinal
      }
    };
  }

  /**
   * POST /contas/:id/dividir
   * Simula a divisão da conta entre N pessoas
   */
  static async dividirConta(contaId, pessoas) {
    if (!pessoas || pessoas <= 0) {
      const error = new Error('Número de pessoas deve ser maior que zero');
      error.statusCode = 400;
      throw error;
    }

    const conta = await Conta.findByPk(contaId);
    if (!conta) {
      const error = new Error('Conta não encontrada');
      error.statusCode = 404;
      throw error;
    }

    // Garantir que o valor está atualizado
    const { valorFinal } = await this.calcularValoresDaConta(conta);

    const valorPorPessoa = valorFinal / pessoas;

    return {
      contaId: conta.id,
      pessoas,
      valorTotal: valorFinal,
      valorPorPessoa: parseFloat(valorPorPessoa.toFixed(2))
    };
  }

  /**
   * POST /contas/:id/desconto
   * Aplica desconto (fixo ou percentual) na conta
   */
  static async aplicarDesconto(contaId, { tipo, valor }) {
    if (!tipo || !['VALOR', 'PERCENTUAL'].includes(tipo)) {
      const error = new Error('Tipo de desconto inválido. Use VALOR ou PERCENTUAL');
      error.statusCode = 400;
      throw error;
    }

    if (!valor || valor <= 0) {
      const error = new Error('Valor do desconto deve ser maior que zero');
      error.statusCode = 400;
      throw error;
    }

    const conta = await Conta.findByPk(contaId);
    if (!conta) {
      const error = new Error('Conta não encontrada');
      error.statusCode = 404;
      throw error;
    }

    if (!['ABERTA', 'AGUARDANDO_PAGAMENTO'].includes(conta.status)) {
      const error = new Error('Não é possível aplicar desconto em conta com status: ' + conta.status);
      error.statusCode = 400;
      throw error;
    }

    // Calcular valor bruto atualizado
    const { valorBruto } = await this.calcularValoresDaConta(conta);

    let descontoValor = 0;
    let descontoPercentual = 0;

    if (tipo === 'VALOR') {
      descontoValor = valor;
      descontoPercentual = 0;
    } else if (tipo === 'PERCENTUAL') {
      if (valor > 100) {
        const error = new Error('Desconto percentual não pode ser maior que 100%');
        error.statusCode = 400;
        throw error;
      }
      descontoPercentual = valor;
      descontoValor = valorBruto * (valor / 100);
    }

    const valorFinal = Math.max(valorBruto - descontoValor, 0);

    await conta.update({
      valorBruto,
      descontoValor,
      descontoPercentual,
      valorFinal
    });

    return {
      id: conta.id,
      status: conta.status,
      valorBruto,
      descontoValor: parseFloat(descontoValor.toFixed(2)),
      descontoPercentual,
      valorFinal: parseFloat(valorFinal.toFixed(2))
    };
  }

  /**
   * POST /contas/:id/fechamento
   * Solicita o fechamento da conta (envia para o caixa)
   */
  static async solicitarFechamento(contaId) {
    const conta = await Conta.findByPk(contaId, {
      include: [{ model: Mesa }]
    });

    if (!conta) {
      const error = new Error('Conta não encontrada');
      error.statusCode;
    }

    if (conta.status !== 'ABERTA') {
      const error = new Error('Apenas contas abertas podem solicitar fechamento');
      error.statusCode = 400;
      throw error;
    }

    // Recalcular valores finais
    const { valorBruto, valorFinal } = await this.calcularValoresDaConta(conta);

    await conta.update({
      status: 'AGUARDANDO_PAGAMENTO',
      valorBruto,
      valorFinal
    });

    // Opcional: marcar mesa como indisponível
    if (conta.Mesa) {
      await conta.Mesa.update({ disponivel: false });
    }

    return {
      id: conta.id,
      status: conta.status,
      valorFinal: parseFloat(valorFinal.toFixed(2)),
      mesaId: conta.mesaId
    };
  }
}

module.exports = ContaService;
