// Documentação:
// Representa um item do cardápio.
module.exports = (sequelize, DataTypes) => {
    const ItemCardapio = sequelize.define('ItemCardapio', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ingredientes: {
            type: DataTypes.STRING
        },
        preco: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        disponivelNaCozinha: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: false
    });
    return ItemCardapio;
};