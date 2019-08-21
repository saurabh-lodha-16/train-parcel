'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('city', {
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
  City.associate = function(models) {
    // associations can be defined here
  };
  return City;
};