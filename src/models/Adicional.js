module.exports = (sequelize, DataTypes) => {
    const Adicional = sequelize.define('Adicional', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precoExtra: {
            type: DataTypes.FLOAT,
            defaultValue: 0.00
        }
    }, {
        timestamps: false
    });
    return Adicional;
};