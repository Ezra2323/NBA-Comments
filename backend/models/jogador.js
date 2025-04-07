const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Time = require('./time');

const Jogador = sequelize.define('Jogador', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nome: DataTypes.STRING,
  sobrenome: DataTypes.STRING,
  num_jogador: DataTypes.INTEGER,
  id_time: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'times',  
      key: 'id'
    },
    allowNull: false
  }
}, {
  tableName: 'jogadores',
  timestamps: false,
});

// Defina a associação
Jogador.belongsTo(Time, { 
  foreignKey: 'id_time',
  targetKey: 'nome',
  as: 'time'  
});

module.exports = Jogador;