module.exports = (sequelize, DataTypes) => {
  const DiaDeJogo = sequelize.define('DiaDeJogo', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Data: DataTypes.DATE
  });

  DiaDeJogo.associate = (models) => {
    DiaDeJogo.hasMany(models.Comentario, { foreignKey: 'id_dia_jogo' });
  };

  return DiaDeJogo;
};
