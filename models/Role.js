'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
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
  roles.associate = function(models) {
    // associations can be defined here
   roles.hasOne(models.roleAssigns, {foreignKey:'roleId', sourceKey:'id'});
  };
  return roles;
};