// src/models/index.js

const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Importação dos Models
const Restaurante = require('./Restaurante')(sequelize, DataTypes);
const Usuario = require('./Usuario')(sequelize, DataTypes);
const Mesa = require('./Mesa')(sequelize, DataTypes);
const Cardapio = require('./Cardapio')(sequelize, DataTypes);
const Categoria = require('./Categoria')(sequelize, DataTypes);
const ItemCardapio = require('./ItemCardapio')(sequelize, DataTypes);
const Cliente = require('./Cliente')(sequelize, DataTypes);
const Pagamento = require('./Pagamento')(sequelize, DataTypes);
const Conta = require('./Conta')(sequelize, DataTypes);
const Pedido = require('./Pedido')(sequelize, DataTypes);
const ItemPedido = require('./ItemPedido')(sequelize, DataTypes);

// --- Associações (Relacionamentos) ---

// 1. Restaurante (Raiz)
Restaurante.hasMany(Usuario, { foreignKey: 'restauranteId' });
Usuario.belongsTo(Restaurante, { foreignKey: 'restauranteId' });

Restaurante.hasMany(Mesa, { foreignKey: 'restauranteId' });
Mesa.belongsTo(Restaurante, { foreignKey: 'restauranteId' });

// 2. Usuário (Gerente) e Cardápio
Usuario.hasOne(Cardapio, { foreignKey: 'gerenteId' });
Cardapio.belongsTo(Usuario, { as: 'gerente', foreignKey: 'gerenteId' });

// 3. Cardápio e Categorias
Cardapio.hasMany(Categoria, { foreignKey: 'cardapioId' });
Categoria.belongsTo(Cardapio, { foreignKey: 'cardapioId' });

// 4. Fluxo de Atendimento (Garçom, Mesa, Conta)
Usuario.hasMany(Mesa, { foreignKey: 'garcomId', constraints: false });
Mesa.belongsTo(Usuario, { foreignKey: 'garcomId', as: 'garcom' });

Mesa.hasOne(Conta, { foreignKey: 'mesaId' });
Conta.belongsTo(Mesa, { foreignKey: 'mesaId' });

Conta.hasMany(Cliente, { foreignKey: 'contaId' });
Cliente.belongsTo(Conta, { foreignKey: 'contaId' });

Conta.hasMany(Pedido, { foreignKey: 'contaId' });
Pedido.belongsTo(Conta, { foreignKey: 'contaId' });

Conta.hasOne(Pagamento, { foreignKey: 'contaId' });
Pagamento.belongsTo(Conta, { foreignKey: 'contaId' });

Cliente.hasMany(Pedido, { foreignKey: 'clienteId' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' });

// 5. Itens e Categorias
Categoria.hasMany(ItemCardapio, { foreignKey: 'categoriaId' });
ItemCardapio.belongsTo(Categoria, { foreignKey: 'categoriaId' });

Categoria.hasMany(Categoria, { as: 'subcategorias', foreignKey: 'categoriaPaiId' });
Categoria.belongsTo(Categoria, { as: 'categoriaPai', foreignKey: 'categoriaPaiId' });

// 6. Pedido e Itens (N para N)
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
    Restaurante,
    Usuario,
    Mesa,
    Cardapio,
    Categoria,
    ItemCardapio,
    Cliente,
    Pagamento,
    Conta,
    Pedido,
    ItemPedido
};