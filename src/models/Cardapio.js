module.exports = (sequelize, DataTypes) => {
    const Cardapio = sequelize.define('Cardapio', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Cardapio;
};