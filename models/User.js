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
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      unique: true,
      allowNull: true,
      type: DataTypes.STRING
    },
    //change its type
    mobileNo: {
      unique: true,
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
    users.hasOne(models.roleAssigns, { foreignKey: 'userId', sourceKey: 'id' });
    users.hasMany(models.packages, { foreignKey: 'senderUserId', sourceKey: 'id' });
    users.hasMany(models.packages, { foreignKey: 'rcvrUserId', sourceKey: 'id' });
    users.hasOne(models.receipts, { foreignKey: 'userId', sourceKey: 'id' });
    users.hasOne(models.offices, { foreignKey: 'userId', sourceKey: 'id' });
  };
  return users;
};