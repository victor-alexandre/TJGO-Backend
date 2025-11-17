module.exports = (sequelize, DataTypes) => {
    const Restaurante = sequelize.define('Restaurante', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Restaurante;
};