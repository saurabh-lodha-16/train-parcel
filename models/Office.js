'use strict';
module.exports = (sequelize, DataTypes) => {
  const offices = sequelize.define('offices', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id:{
      type: DataTypes.UUID,
      allowNull: false,
      references:{
       model: 'users',
       key: 'id',
       onUpdate: "cascade",
       onDelete: "set null"
      }
    },
    city_id:{
      type:DataTypes.UUID,
      allowNull:false,
      references:{
        model: 'cities',
        key: 'id',
        onUpdate: "cascade",
        onDelete: "set null"
       }
    },
  }, {});
  offices.associate = function(models) {
    // associations can be defined here
    offices.belongsTo(models.users);
    offices.belongsTo(models.cities);
  };
  return offices;
};