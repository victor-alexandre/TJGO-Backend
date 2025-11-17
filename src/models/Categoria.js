// Documentação:
// Representa a Categoria de um item do cardápio.
module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Categoria;
};