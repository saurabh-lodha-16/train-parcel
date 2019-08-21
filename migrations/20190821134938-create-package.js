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
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references:{
         model: 'users',
         key: 'id',
         onUpdate: "cascade",
         onDelete: "set null"
        }
      },
      train_id:{
        type:Sequelize.UUID,
        allowNull: true,
        references:{
         model: 'trains',
         key: 'id',
         onUpdate: "cascade",
         onDelete: "set null"
        }
      },
      status_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references:{
         model: 'statuses',
         key: 'id',
         onUpdate: "cascade",
         onDelete: "set null"
        }
      },
      weight: {
        type:Sequelize.FLOAT
      }, 
      sCity:{
        type: Sequelize.UUID,
        allowNull: false,
        references:{
         model: 'cities',
         key: 'id',
         onUpdate: "cascade",
         onDelete: "set null"
      }
    },
      dCity:{
        type: Sequelize.UUID,
        allowNull: false,
        references:{
         model: 'cities',
         key: 'id',
         onUpdate: "cascade",
         onDelete: "set null"
      }
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