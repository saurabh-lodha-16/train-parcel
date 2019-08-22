'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        unique:true,
        allowNull: true,
        type: Sequelize.STRING
      },
      //change its type
      mobileNo: {
        unique:true,
        allowNull: true,
        type: Sequelize.BIGINT
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING
      },
      key: {
        allowNull: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
     

      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};