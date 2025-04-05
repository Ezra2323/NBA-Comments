module.exports = (sequelize, DataTypes) => {
    const Time = sequelize.define('Time', {
      Nome: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    });
  
    Time.associate = (models) => {
      Time.hasMany(models.Jogador, { foreignKey: 'Id_time' });
    };
  
    return Time;
  };
  