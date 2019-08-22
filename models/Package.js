'use strict';
module.exports = (sequelize, DataTypes) => {
  const packages = sequelize.define('packages', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    serial_no:{
      allowNull:false,
      unique:true,
      type:DataTypes.INTEGER,
      autoIncrement: true,
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
    recv_id:{
      type: DataTypes.UUID,
      allowNull: false,
      references:{
       model: 'users',
       key: 'id',
       onUpdate: "cascade",
       onDelete: "set null"
      }
    },
    recv_name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    recv_details:{
      type:DataTypes.STRING,
      allowNull:false
    },
    train_id:{
      type:DataTypes.UUID,
      allowNull: true,
      references:{
       model: 'trains',
       key: 'id',
       onUpdate: "cascade",
       onDelete: "set null"
      }
    },
    status_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references:{
       model: 'statuses',
       key: 'id',
       onUpdate: "cascade",
       onDelete: "set null"
      }
    },
    weight: {
      type:DataTypes.FLOAT
    }, 
    sCity:{
      type: DataTypes.UUID,
      allowNull: false,
      references:{
       model: 'cities',
       key: 'id',
       onUpdate: "cascade",
       onDelete: "set null"
    }
  },
    dCity:{
      type: DataTypes.UUID,
      allowNull: false,
      references:{
       model: 'cities',
       key: 'id',
       onUpdate: "cascade",
       onDelete: "set null"
    }
  },
}, {});
  packages.associate = function(models) {
    // associations can be defined here
    packages.belongsTo(models.users);
    packages.belongsTo(models.trains);
    packages.belongsTo(models.statuses);
    packages.hasOne(models.receipts);
  };
  return packages;
};