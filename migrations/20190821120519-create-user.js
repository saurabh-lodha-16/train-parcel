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
         type: Sequelize.STRING
       },
        //change its type
       mobileNo: {
         type: Sequelize.BIGINT
       },
       password: { 
         type: Sequelize.STRING
       }, 
       key:{
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