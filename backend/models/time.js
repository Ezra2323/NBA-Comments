const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Time = sequelize.define('Time', {
  nome: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true 
  }
}, {
  tableName: 'times',
  timestamps: false,
});

module.exports = Time;
