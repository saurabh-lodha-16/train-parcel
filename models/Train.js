'use strict';
module.exports = (sequelize, DataTypes) => {
  const trains = sequelize.define('trains', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    trainNo: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  trains.associate = function (models) {
    // associations can be defined here
    trains.hasOne(models.packages, { foreignKey: 'trainId', sourceKey: 'id' });
    trains.hasMany(models.trainStatuses, { foreignKey: 'trainId', sourceKey: 'id' });
  };
  return trains;
};

