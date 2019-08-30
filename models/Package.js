'use strict';
module.exports = (sequelize, DataTypes) => {
  const packages = sequelize.define('packages', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    serial_no: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    senderUserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rcvrUserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sCity: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    dCity: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    trainId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    statusId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sCityTrainStatusId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    dCityTrainStatusId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  packages.associate = function (models) {
    // associations can be defined here
    packages.belongsTo(models.users, { targetKey: 'id', foreignKey: 'senderUserId' });
    packages.belongsTo(models.users, { targetKey: 'id', foreignKey: 'rcvrUserId' });
    packages.belongsTo(models.trains, { targetKey: 'id' });
    packages.belongsTo(models.statuses, { targetKey: 'id' });
    packages.belongsTo(models.cities, { targetKey: 'id', foreignKey: 'sCity' });
    packages.belongsTo(models.cities, { targetKey: 'id', foreignKey: 'dCity' });
    packages.hasOne(models.receipts, { foreignKey: 'packageId', sourceKey: 'id' });
  };
  return packages;
};

