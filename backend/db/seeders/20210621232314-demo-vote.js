'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductVotes', [
      {
        voteSum: 1,
        userId: 1,
        productId: 1
      },
      {
        voteSum: 1,
        userId: 2,
        productId: 1
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductVotes');
  }
};
