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
        allowNull: false,
         type: Sequelize.STRING
       },
        //change its type
       mobileNo: { 
        allowNull: false,
         type: Sequelize.STRING
       },
       password: { 
        allowNull: false,
         type: Sequelize.STRING
       }, 
       key:{
        allowNull: false,
         type:Sequelize.UUID
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
    return queryInterface.dropTable('users');
  }
};