// Documentação:
// Representa um Pedido feito para a cozinha.
module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('Pedido', {
        numero: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        horarioPedido: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        horarioEntrega: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        timestamps: false
    });
    return Pedido;
};