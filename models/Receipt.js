'use strict';
module.exports = (sequelize, DataTypes) => {
  const receipts = sequelize.define('receipts', {
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
    package_id:{
      type:DataTypes.UUID,
      allowNull: false,
      references:{
       model: 'packages',
       key: 'id',
       onUpdate: "cascade",
       onDelete: "set null"
      }
    },
    totalAmount:{
      type:DataTypes.FLOAT,
      allowNull: false,
    },  
  }, {});
  receipts.associate = function(models) {
    receipts.belongsTo(models.users);
    receipts.belongsTo(models.packages);
  };
  return receipts;
};