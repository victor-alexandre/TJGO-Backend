// Documentação:
// Representa a Mesa do restaurante.
module.exports = (sequelize, DataTypes) => {
    const Mesa = sequelize.define('Mesa', {
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        disponivel: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: false
    });
    return Mesa;
};