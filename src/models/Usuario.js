// Documentação:
// Este model representa o Usuário.
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo: {
            type: DataTypes.ENUM('Garcom', 'Caixa', 'Cozinha', 'Gerente'),
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Usuario;
};