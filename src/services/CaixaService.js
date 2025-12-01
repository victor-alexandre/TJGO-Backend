// src/services/CaixaService.js
const { Conta, Mesa, Pedido, Pagamento, sequelize } = require('../models'); 

class CaixaService {

  // Lista contas que pediram fechamento
  static async listarContasAbertas() {
    const contas = await Conta.findAll({
      where: { status: 'AGUARDANDO_PAGAMENTO' },
      include: [
        { 
          model: Mesa, 
          as: 'Mesa', // Alias com M maiúsculo (conforme seu Model)
          attributes: ['id', 'numero'] 
        },
        {
          model: Pedido,
          as: 'Pedidos', // Alias com P maiúsculo (conforme seu Model)
          attributes: ['id', 'status']
        }
      ],
      order: [['id', 'ASC']]
    });

    return contas.map((conta) => ({
      contaId: conta.id,
      mesaId: conta.mesaId,
      
      // CORREÇÃO 1: Acessar conta.Mesa (igual ao alias)
      numeroMesa: conta.Mesa ? conta.Mesa.numero : 'Balcão/N/A',
      
      status: conta.status,
      valorBruto: parseFloat(conta.valorBruto || 0).toFixed(2),
      descontoValor: parseFloat(conta.descontoValor || 0).toFixed(2),
      descontoPercentual: parseFloat(conta.descontoPercentual || 0).toFixed(2),
      valorFinal: parseFloat(conta.valorFinal || 0).toFixed(2),
      
      // CORREÇÃO 2: Acessar conta.Pedidos (igual ao alias)
      pedidos: (conta.Pedidos || []).map((p) => ({
        id: p.id,
        status: p.status
      }))
    }));
  }

  // Lista os ENUMs do model
  static async listarFormasPagamento() {
    const enumValues = Pagamento.rawAttributes.tipo.values;
    return enumValues;
  }

  // Processa o pagamento COM TRANSAÇÃO (Segurança Financeira)
  static async processarPagamento({ contaId, tipo, valorPago, nro_transacao, numero_cheque }) {
    // Inicia transação
    const t = await sequelize.transaction();

    try {
      // 1. Validações básicas (fail fast)
      if (!contaId) throw { statusCode: 400, message: 'contaId é obrigatório' };
      if (!tipo) throw { statusCode: 400, message: 'tipo de pagamento é obrigatório' };
      if (!valorPago || valorPago <= 0) throw { statusCode: 400, message: 'valorPago deve ser maior que zero' };

      const tiposValidos = Pagamento.rawAttributes.tipo.values;
      if (!tiposValidos.includes(tipo)) {
        throw { statusCode: 400, message: `Tipo inválido. Aceitos: ${tiposValidos.join(', ')}` };
      }

      // 2. Busca conta TRAVANDO A LEITURA dentro da transação
      const conta = await Conta.findByPk(contaId, { transaction: t });
      
      if (!conta) throw { statusCode: 404, message: 'Conta não encontrada' };
      if (conta.status !== 'AGUARDANDO_PAGAMENTO') {
        throw { statusCode: 409, message: `Status inválido para pagamento: ${conta.status}` };
      }

      // 3. Verifica valor
      const valorFinal = parseFloat(conta.valorFinal || conta.valorBruto || 0);
      if (valorPago < valorFinal) {
        throw { statusCode: 400, message: `Valor insuficiente. Devido: ${valorFinal.toFixed(2)}` };
      }

      const troco = parseFloat((valorPago - valorFinal).toFixed(2));

      // 4. Cria pagamento
      const pagamento = await Pagamento.create({
        tipo,
        nro_transacao: nro_transacao || null,
        numero_cheque: numero_cheque || null
      }, { transaction: t });

      // 5. Atualiza Conta
      await conta.update({ status: 'PAGA' }, { transaction: t });

      // 6. Confirma transação
      await t.commit();

      return {
        conta: {
          id: conta.id,
          status: 'PAGA',
          valorFinal: parseFloat(valorFinal.toFixed(2))
        },
        pagamentoRegistrado: {
          id: pagamento.id,
          tipo: pagamento.tipo,
          nro_transacao: pagamento.nro_transacao
        },
        valorPago: parseFloat(valorPago).toFixed(2),
        troco: troco.toFixed(2)
      };

    } catch (error) {
      await t.rollback();
      // Repassa o erro mantendo o statusCode se já existir
      const err = new Error(error.message || 'Erro no processamento');
      err.statusCode = error.statusCode || 500;
      throw err;
    }
  }
}

module.exports = CaixaService;