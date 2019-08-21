'use strict';
module.exports = (sequelize, DataTypes) => {
  const roleAssigns = sequelize.define('roleAssigns', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references:{
       model: 'users',
       key: 'id',
       onUpdate: "cascade",
       onDelete: "set null"
      }
    },
    role_id:{
      type:DataTypes.UUID,
      allowNull: false,
      references:{
       model: 'roles',
       key: 'id',
       onUpdate: "cascade",
       onDelete: "set null"
      }
    },
  }, {});
  roleAssigns.associate = function(models) {
    // associations can be defined here
   roleAssigns.belongsTo(models.users);
   roleAssigns.belongsTo(models.roles);
  };
  return roleAssigns;
};