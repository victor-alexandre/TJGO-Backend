// src/models/index.js

const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Importação dos Models
const Usuario = require('./Usuario')(sequelize, DataTypes);
const Mesa = require('./Mesa')(sequelize, DataTypes);
const Categoria = require('./Categoria')(sequelize, DataTypes);
const ItemCardapio = require('./ItemCardapio')(sequelize, DataTypes);
const Cliente = require('./Cliente')(sequelize, DataTypes);
const Pagamento = require('./Pagamento')(sequelize, DataTypes);
const Conta = require('./Conta')(sequelize, DataTypes);
const Pedido = require('./Pedido')(sequelize, DataTypes);
const ItemPedido = require('./ItemPedido')(sequelize, DataTypes);

// --- Definição das Associações (Relacionamentos) ---

// Garçom (Usuário) atende Mesas
Usuario.hasMany(Mesa, { foreignKey: 'garcomId', constraints: false }); // Um Garçom atende N Mesas
Mesa.belongsTo(Usuario, { foreignKey: 'garcomId', as: 'garcom' }); // Uma Mesa é atendida por 1 Garçom

// Mesa e Conta (1 para 1)
Mesa.hasOne(Conta, { foreignKey: 'mesaId' }); // Uma Mesa tem 1 Conta 
Conta.belongsTo(Mesa, { foreignKey: 'mesaId' }); // Uma Conta pertence a 1 Mesa

// Conta e Cliente (1 para N)
Conta.hasMany(Cliente, { foreignKey: 'contaId' }); // Uma Conta gerencia N Clientes 
Cliente.belongsTo(Conta, { foreignKey: 'contaId' }); // Um Cliente pertence a 1 Conta

// Conta e Pedido (1 para N)
Conta.hasMany(Pedido, { foreignKey: 'contaId' }); // Uma Conta gera N Pedidos 
Pedido.belongsTo(Conta, { foreignKey: 'contaId' }); // Um Pedido é gerado por 1 Conta

// Cliente e Pedido (1 para N)
Cliente.hasMany(Pedido, { foreignKey: 'clienteId' }); // Um Cliente faz N Pedidos 
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' }); // Um Pedido é feito por 1 Cliente

// Conta e Pagamento (1 para 1)
Conta.hasOne(Pagamento, { foreignKey: 'contaId' }); // Uma Conta é paga por 1 Pagamento
Pagamento.belongsTo(Conta, { foreignKey: 'contaId' }); // Um Pagamento paga 1 Conta

// Categoria e ItemCardapio (1 para N)
Categoria.hasMany(ItemCardapio, { foreignKey: 'categoriaId' }); // Uma Categoria possui N Itens 
ItemCardapio.belongsTo(Categoria, { foreignKey: 'categoriaId' }); // Um Item pertence a 1 Categoria

// Categoria e Subcategorias (Auto-relacionamento)
Categoria.hasMany(Categoria, { as: 'subcategorias', foreignKey: 'categoriaPaiId' });
Categoria.belongsTo(Categoria, { as: 'categoriaPai', foreignKey: 'categoriaPaiId' });

// Relacionamento N-para-N: Pedido <-> ItemCardapio (através de ItemPedido)
Pedido.belongsToMany(ItemCardapio, {
    through: ItemPedido,
    foreignKey: 'pedidoId'
});
ItemCardapio.belongsToMany(Pedido, {
    through: ItemPedido,
    foreignKey: 'itemCardapioId'
});

// Exporta todos os models e a conexão
module.exports = {
    sequelize,
    Usuario,
    Mesa,
    Categoria,
    ItemCardapio,
    Cliente,
    Pagamento,
    Conta,
    Pedido,
    ItemPedido
};