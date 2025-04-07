const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express(); // Defina a instância do aplicativo aqui
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

// Testar conexão com o banco
sequelize.authenticate()
  .then(() => {
    console.log('🟢 Conectado ao banco de dados!');
    return sequelize.sync(); // cria as tabelas, se necessário
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}/api`);
    });
  })
  .catch(err => {
    console.error('🔴 Erro ao conectar ao banco de dados:', err);
  });
