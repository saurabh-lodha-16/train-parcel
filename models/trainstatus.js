'use strict';
module.exports = (sequelize, DataTypes) => {
  const trainStatuses = sequelize.define('trainStatuses', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    train_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'trains',
        key: 'id',
        onUpdate: "cascade",
        onDelete: "set null"
      }
    },
    sCity: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'id',
        onUpdate: "cascade",
        onDelete: "set null"
      }
    },
    dCity: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'id',
        onUpdate: "cascade",
        onDelete: "set null"
      }
    },
    sTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    dTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
  }, {});
  trainStatuses.associate = function (models) {
    // associations can be defined here
    trainStatuses.belongsTo(models.trains);
  };
  return trainStatuses;
};