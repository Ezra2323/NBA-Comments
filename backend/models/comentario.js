const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');
const DiaDeJogo = require('./diaDeJogo');

const Comentario = sequelize.define('Comentario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  comentario: DataTypes.STRING,
}, {
  tableName: 'comentarios',
  timestamps: false,
});

Comentario.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Comentario.belongsTo(DiaDeJogo, { foreignKey: 'id_dia_jogo' });

module.exports = Comentario;
