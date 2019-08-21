'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },
    level: {
      type: DataTypes.INTEGER
    }
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
  };
  return Role;
};