// src/models/Pedido.js

// Documentação:
// Representa um Pedido feito para a cozinha.
module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('Pedido', {
        numero: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'PENDENTE',
            allowNull: false
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