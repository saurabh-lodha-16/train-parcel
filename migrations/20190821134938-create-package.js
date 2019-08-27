'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('packages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      serial_no: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      senderUserId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      rcvrUserId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      weight: {
        type: Sequelize.FLOAT
      },
      name:{
        type:Sequelize.STRING,
        allowNull:true
      },
      sCity: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      dCity: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      trainId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      statusId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      sCityTrainStatusId:{
        type: Sequelize.UUID,
        allowNull:true
      },
      dCityTrainStatusId:{
        type: Sequelize.UUID,
        allowNull:true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('packages');
  }
};