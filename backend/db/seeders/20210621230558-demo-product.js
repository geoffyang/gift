'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Products', [
      {
        title: 'Tiny Air Purifier',
        // imageUrl: '',
        description: "Air quality can have a big effect on wellbeing. Our tiny purifier can keep air quality high, one room at a time.",
        userId: 1
      },
      {
        title: 'Vitamin Supplements',
        // imageUrl: '',
        description: "Essential nutrients to boost your sleep, vision, cardiovascular and cell functions",
        userId: 1
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Products', {
      title: { [Op.in]: ['Tiny Air Purifier', 'Vitamin Supplements'] }
    }, {});
  }
};
