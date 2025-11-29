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
const Adicional = require('./Adicional')(sequelize, DataTypes);
const ItemPedidoAdicional = require('./ItemPedidoAdicional')(sequelize, DataTypes);

// ----------------------------------------------
// 1. Restaurante
// ----------------------------------------------
Restaurante.hasMany(Usuario, { foreignKey: 'restauranteId' });
Usuario.belongsTo(Restaurante, { foreignKey: 'restauranteId' });

Restaurante.hasMany(Mesa, { foreignKey: 'restauranteId' });
Mesa.belongsTo(Restaurante, { foreignKey: 'restauranteId' });

// ----------------------------------------------
// 2. Usuário (gerente) e Cardápio
// ----------------------------------------------
Usuario.hasOne(Cardapio, { foreignKey: 'gerenteId' });
Cardapio.belongsTo(Usuario, { as: 'gerente', foreignKey: 'gerenteId' });

// ----------------------------------------------
// 3. Cardápio e Categorias
// ----------------------------------------------
Cardapio.hasMany(Categoria, { foreignKey: 'cardapioId' });
Categoria.belongsTo(Cardapio, { foreignKey: 'cardapioId' });

Categoria.hasMany(Categoria, { as: 'subcategorias', foreignKey: 'categoriaPaiId' });
Categoria.belongsTo(Categoria, { as: 'categoriaPai', foreignKey: 'categoriaPaiId' });

// ----------------------------------------------
// 4. Fluxo de Atendimento (Mesa, Conta, Cliente)
// ----------------------------------------------
Usuario.hasMany(Mesa, { foreignKey: 'garcomId', constraints: false });
Mesa.belongsTo(Usuario, { foreignKey: 'garcomId', as: 'garcom' });

Mesa.hasOne(Conta, { foreignKey: 'mesaId' });
Conta.belongsTo(Mesa, { foreignKey: 'mesaId' });

Conta.hasMany(Cliente, { foreignKey: 'contaId' });
Cliente.belongsTo(Conta, { foreignKey: 'contaId' });

Conta.hasMany(Pedido, { foreignKey: 'contaId' });
Pedido.belongsTo(Conta, { foreignKey: 'contaId' });

Cliente.hasMany(Pedido, { foreignKey: 'clienteId' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' });

Conta.hasOne(Pagamento, { foreignKey: 'contaId' });
Pagamento.belongsTo(Conta, { foreignKey: 'contaId' });

// ----------------------------------------------
// 5. Categorias e Itens do Cardápio
// ----------------------------------------------
Categoria.hasMany(ItemCardapio, { foreignKey: 'categoriaId' });
ItemCardapio.belongsTo(Categoria, { foreignKey: 'categoriaId' });

// ----------------------------------------------
// 6. Pedido -> ItemPedido (1:N)
// ----------------------------------------------
Pedido.hasMany(ItemPedido, { foreignKey: 'pedidoId', as: 'linhasDoPedido' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

// ----------------------------------------------
// 7. ItemPedido -> ItemCardapio (1:N)
// ----------------------------------------------
ItemPedido.belongsTo(ItemCardapio, { foreignKey: 'itemCardapioId' });
ItemCardapio.hasMany(ItemPedido, { foreignKey: 'itemCardapioId' });

// ----------------------------------------------
// 8. Pedido <-> ItemCardapio (N:N via ItemPedido)
// ----------------------------------------------
Pedido.belongsToMany(ItemCardapio, {
    through: ItemPedido,
    foreignKey: 'pedidoId',
    otherKey: 'itemCardapioId',
    as: 'itensDoCardapio'
});

ItemCardapio.belongsToMany(Pedido, {
    through: ItemPedido,
    foreignKey: 'itemCardapioId',
    otherKey: 'pedidoId'
});

// ----------------------------------------------
// 9. ItemPedido <-> Adicional (N:N via ItemPedidoAdicional)
// ----------------------------------------------
ItemPedido.belongsToMany(Adicional, {
    through: ItemPedidoAdicional,
    foreignKey: 'itemPedidoId',
    otherKey: 'adicionalId',
    as: 'adicionaisDoItem'
});

Adicional.belongsToMany(ItemPedido, {
    through: ItemPedidoAdicional,
    foreignKey: 'adicionalId',
    otherKey: 'itemPedidoId'
});

// ----------------------------------------------
// 10. Relações diretas com pivot (facilitam serviços)
// ----------------------------------------------
ItemPedido.hasMany(ItemPedidoAdicional, { foreignKey: 'itemPedidoId' });
ItemPedidoAdicional.belongsTo(ItemPedido, { foreignKey: 'itemPedidoId' });

Adicional.hasMany(ItemPedidoAdicional, { foreignKey: 'adicionalId' });
ItemPedidoAdicional.belongsTo(Adicional, { foreignKey: 'adicionalId' });

// ----------------------------------------------
// EXPORTAÇÃO
// ----------------------------------------------
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
    ItemPedido,
    Adicional,
    ItemPedidoAdicional
};
