'use strict';
module.exports = (sequelize, DataTypes) => {
  const Train = sequelize.define('train', {
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
  Train.associate = function(models) {
    // associations can be defined here
  };
  return Train;
};