const express = require('express');
const app = express();
const routes = require('./routes');
const db = require('./models');

app.use(express.json());
app.use('/api', routes);

db.sequelize.sync({ alter: true }) // { force: true } para deletar e recriar as tabelas
  .then(() => console.log('Banco sincronizado com sucesso!'))
  .catch((err) => console.error('Erro ao sincronizar o banco:', err));

module.exports = app;
