const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importando models
db.Jogador = require('./jogadores.js')(sequelize, Sequelize.DataTypes);
db.Time = require('./time.js')(sequelize, Sequelize.DataTypes);
db.Usuario = require('./usuario.js')(sequelize, Sequelize.DataTypes);
db.Comentario = require('./comentario.js')(sequelize, Sequelize.DataTypes);
db.DiaDeJogo = require('./diaDeJogo.js')(sequelize, Sequelize.DataTypes);

// Associações entre os models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
