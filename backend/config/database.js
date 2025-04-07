const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nba2', 'postgres', '1234', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

module.exports = sequelize;
