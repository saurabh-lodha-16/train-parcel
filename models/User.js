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
      allowNull: true,
      type: DataTypes.STRING
    },
    //change its type
    mobileNo: {
      allowNull: true,
      type: DataTypes.BIGINT
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING
    },
    key: {
      allowNull: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {});
  users.associate = function (models) {
    // associations can be defined here
    users.hasOne(models.roleAssigns);
    users.hasMany(models.packages);
    users.hasOne(models.receipts);
  };
  return users;
};