'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Reviews', [
      {
        text: "My mother enjoyed this purifier",
        userId: 1,
        productId: 1
      },
      {
        text: "It really was tiny",
        userId: 1,
        productId: 1
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};
