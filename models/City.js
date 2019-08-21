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
  };
  return cities;
};