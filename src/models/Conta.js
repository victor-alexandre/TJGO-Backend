// Documentação:
// Representa a Conta (ou comanda) da mesa.
module.exports = (sequelize, DataTypes) => {
    const Conta = sequelize.define('Conta', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Conta;
};