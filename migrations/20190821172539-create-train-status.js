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
        references: {
          model: 'trains',
          key: 'id',
          onUpdate: "cascade",
          onDelete: "set null"
        }
      },
      date:{
        type:Sequelize.DATEONLY,
        allowNull:false,
      },
      sCity: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'cities',
          key: 'id',
          onUpdate: "cascade",
          onDelete: "set null"
        }
      },
      dCity: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'cities',
          key: 'id',
          onUpdate: "cascade",
          onDelete: "set null"
        }
      },
      sTime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      dTime: {
        type: Sequelize.TIME,
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