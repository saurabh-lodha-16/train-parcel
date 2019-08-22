'use strict';
module.exports = (sequelize, DataTypes) => {
  const cities = sequelize.define('cities', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type:DataTypes.STRING
    }
  }, {});
  cities.associate = function(models) {
    // associations can be defined here
    cities.hasOne(models.offices, {foreignKey:'cityId', sourceKey:'id'})
    cities.hasOne(models.trainStatuses, {foreignKey:'sCity', sourceKey:'id'})
    cities.hasOne(models.trainStatuses, {foreignKey:'dCity', sourceKey:'id'})
    cities.hasOne(models.packages, {foreignKey:'sCity', sourceKey:'id'})
    cities.hasOne(models.packages, {foreignKey:'dCity', sourceKey:'id'})
  };
  return cities;
};