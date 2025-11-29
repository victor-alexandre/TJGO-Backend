// Documentação:
// Esta é a tabela 'pivot' (associativa) para o relacionamento N-N entre Pedido e ItemCardapio.
// Ela armazena a quantidade de cada item em um pedido.
module.exports = (sequelize, DataTypes) => {
    const ItemPedido = sequelize.define('ItemPedido', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantidade: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        timestamps: false
    });
    return ItemPedido;
};