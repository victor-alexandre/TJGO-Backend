module.exports = (sequelize, DataTypes) => {
    const ItemPedidoAdicional = sequelize.define('ItemPedidoAdicional', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantidade: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
    }, {
        timestamps: false
    });
    return ItemPedidoAdicional;
};