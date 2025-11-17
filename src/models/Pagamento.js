// Documentação:
// Representa o Pagamento.
module.exports = (sequelize, DataTypes) => {
    const Pagamento = sequelize.define('Pagamento', {
        tipo: {
            type: DataTypes.ENUM('Dinheiro', 'Cartao', 'Cheque'),
            allowNull: false
        },
        nro_transacao: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        numero_cheque: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: false
    });
    return Pagamento;
};