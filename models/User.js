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
       type: DataTypes.STRING
     },
     //change its type
     mobileNo: { 
       type: DataTypes.BIGINT
     },
     password: { 
       type: DataTypes.STRING
     }, 
     key:{
       type:DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4
     },
  }, {});
  users.associate = function(models) {
    // associations can be defined here
   users.hasOne(models.roleAssigns);
   users.hasMany(models.packages);
   users.hasOne(models.receipts);
  };
  return users;
};