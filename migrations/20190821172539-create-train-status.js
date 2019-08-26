'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('trainStatuses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      train_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      sCity: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      dCity: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      sTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dTime: {
        type: Sequelize.DATE,
        allowNull: false
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
    return queryInterface.dropTable('trainStatuses');
  }
};