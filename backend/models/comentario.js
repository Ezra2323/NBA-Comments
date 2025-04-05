module.exports = (sequelize, DataTypes) => {
    const Comentario = sequelize.define('Comentario', {
      UniqueID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_usuario: DataTypes.INTEGER,
      id_dia_jogo: DataTypes.INTEGER,
      Comentario: DataTypes.STRING
    });
  
    Comentario.associate = (models) => {
      Comentario.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
      Comentario.belongsTo(models.DiaDeJogo, { foreignKey: 'id_dia_jogo' });
    };
  
    return Comentario;
  };
  