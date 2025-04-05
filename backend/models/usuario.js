module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    Nome: DataTypes.STRING,
    Nickname: DataTypes.STRING,
    Senha: DataTypes.STRING
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Comentario, { foreignKey: 'id_usuario' });
  };

  return Usuario;
};
