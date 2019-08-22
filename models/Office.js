'use strict';
module.exports = (sequelize, DataTypes) => {
  const offices = sequelize.define('offices', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId:{
      type: DataTypes.UUID,
      allowNull: false,
    },
    cityId:{
      type:DataTypes.UUID,
      allowNull:false,
    },
  }, {});
  offices.associate = function(models) {
    // associations can be defined here
    offices.belongsTo(models.users, {targetKey:'id'});
    offices.belongsTo(models.cities, {targetKey:'id'});
  };
  return offices;
};