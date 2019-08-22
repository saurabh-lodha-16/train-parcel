'use strict';
module.exports = (sequelize, DataTypes) => {
  const roleAssigns = sequelize.define('roleAssigns', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    roleId:{
      type:DataTypes.UUID,
      allowNull: false,
    },
  }, {});
  roleAssigns.associate = function(models) {
    // associations can be defined here
   roleAssigns.belongsTo(models.users, {targetKey:'id'});
   roleAssigns.belongsTo(models.roles, {targetKey:'id'});
  };
  return roleAssigns;
};