'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: { 
      allowNull: false,
      type: DataTypes.STRING
     },
     email: { 
      allowNull: false,
       type: DataTypes.STRING
     },
     //change its type
     mobileNo: { 
      allowNull: false,
       type: DataTypes.STRING
     },
     password: { 
      allowNull: false,
       type: DataTypes.STRING
     }, 
     key:{
      allowNull: false,
       type:DataTypes.UUID
     },
  }, {});
  users.associate = function(models) {
    // associations can be defined here
   users.hasOne(models.roleAssigns);
   users.hasOne(models.packages);
  };
  return users;
};