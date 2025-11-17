// Documentação:
// Representa o Cliente/Convidado na mesa.
module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Cliente', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horaChegada: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        horaSaida: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        timestamps: false
    });
    return Cliente;
};