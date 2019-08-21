'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('receipts', {
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
      package_id:{
        type:Sequelize.UUID,
        allowNull: false,
        references:{
         model: 'packages',
         key: 'id',
         onUpdate: "cascade",
         onDelete: "set null"
        }
      },
      totalAmount:{
        type:Sequelize.FLOAT,
        allowNull: false,
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
    return queryInterface.dropTable('receipts');
  }
};