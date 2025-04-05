module.exports = (sequelize, DataTypes) => {
    const Jogador = sequelize.define('Jogador', {
      UniqueID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nome: DataTypes.STRING,
      Sobrenome: DataTypes.STRING,
      Id_time: DataTypes.STRING,
      Num_jogador: DataTypes.INTEGER
    });
  
    Jogador.associate = (models) => {
      Jogador.belongsTo(models.Time, { foreignKey: 'Id_time' });
    };
  
    return Jogador;
  };
  