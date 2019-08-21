'use strict';
module.exports = (sequelize, DataTypes) => {
  const statuses = sequelize.define('statuses', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    type: {
      type: DataTypes.STRING
    }
  }, {});
  statuses.associate = function(models) {
    // associations can be defined here
    statuses.hasOne(models.packages);
  };
  return statuses;
};