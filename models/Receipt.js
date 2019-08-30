'use strict';
module.exports = (sequelize, DataTypes) => {
  const receipts = sequelize.define('receipts', {
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
    packageId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  receipts.associate = function (models) {
    receipts.belongsTo(models.users, { targetKey: 'id' });
    receipts.belongsTo(models.packages, { targetKey: 'id' });
  };
  return receipts;
};

