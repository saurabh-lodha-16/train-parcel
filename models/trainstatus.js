'use strict';
module.exports = (sequelize, DataTypes) => {
  const trainStatuses = sequelize.define('trainStatuses', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    trainId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sCity: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    dCity: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isRunning:{
      type: DataTypes.BOOLEAN,
      defaultValue:true
     },
  }, {});
  trainStatuses.associate = function (models) {
    // associations can be defined here
    trainStatuses.belongsTo(models.trains, {targetKey:'id'});
    trainStatuses.belongsTo(models.cities, {targetKey:'id', foreignKey:'sCity'});
    trainStatuses.belongsTo(models.cities, {targetKey:'id', foreignKey:'dCity'});

  };
  return trainStatuses;
};