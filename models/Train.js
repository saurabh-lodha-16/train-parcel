'use strict';
module.exports = (sequelize, DataTypes) => {
  const trains = sequelize.define('trains', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type:DataTypes.STRING
    }, 
  }, {});
  trains.associate = function(models) {
    // associations can be defined here
  };
  return trains;
};