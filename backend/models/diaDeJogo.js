const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Time = require('./time');

const DiaDeJogo = sequelize.define('DiaDeJogo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  time1_nome: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Time,
      key: 'nome'
    }
  },
  time2_nome: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Time,
      key: 'nome'
    }
  }
}, {
  tableName: 'dias_de_jogo',
  timestamps: false,
});

// Relações
DiaDeJogo.belongsTo(Time, { as: 'time1', foreignKey: 'time1_nome' });
DiaDeJogo.belongsTo(Time, { as: 'time2', foreignKey: 'time2_nome' });

module.exports = DiaDeJogo;
