// src/models/ItemCardapio.js

module.exports = (sequelize, DataTypes) => {
    const ItemCardapio = sequelize.define('ItemCardapio', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: { // Antes era só 'ingredientes', agora padronizei como descricao
            type: DataTypes.STRING
        },
        categoria: { // Novo campo para o filtro solicitado
            type: DataTypes.STRING, // Ex: "Bebida", "Prato Principal"
            defaultValue: "Geral"
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
        timestamps: false,
        tableName: 'ItemCardapios' // Garante o nome da tabela
    });

    return ItemCardapio;
};