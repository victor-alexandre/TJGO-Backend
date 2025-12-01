// src/models/Conta.js
// Representa a Conta (ou comanda) da mesa.
module.exports = (sequelize, DataTypes) => {
  const Conta = sequelize.define('Conta', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      // ABERTA = em uso
      // AGUARDANDO_PAGAMENTO = cliente pediu fechamento
      // PAGA = pagamento concluído
      // CANCELADA = alguma exceção
      type: DataTypes.ENUM('ABERTA', 'AGUARDANDO_PAGAMENTO', 'PAGA', 'CANCELADA'),
      allowNull: false,
      defaultValue: 'ABERTA'
    },
    valorBruto: {
      // Soma dos itens (sem aplicar desconto)
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    descontoValor: {
      // Desconto em reais
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    descontoPercentual: {
      // Desconto em percentual (0 a 100)
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    valorFinal: {
      // valorBruto - descontoValor (ajustado)
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: false
  });

  return Conta;
};
