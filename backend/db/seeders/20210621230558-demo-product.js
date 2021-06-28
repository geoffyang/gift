'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Products', [
      {
        title: 'Tiny Air Purifier',
        // imageUrl: '',
        shortDescription:"Breathe better, have more energy",
        longDescription: "Air quality can have a big effect on wellbeing. Our tiny purifier can keep air quality high, one room at a time.",
        userId: 1,
        imageUrl: 'https://giftnowbucket.s3.amazonaws.com/1624856767316.png'
      },
      {
        title: 'Vitamin Supplements',
        // imageUrl: '',
        shortDescription:"Artisinal vitamins to feed your soul.",
        longDescription: "Essential nutrients to boost your sleep, vision, cardiovascular and cell functions",
        userId: 1,
        imageUrl: 'https://giftnowbucket.s3.amazonaws.com/1624856943399.png'
      },
      {
        title: 'Childrens Slingshot',
        // imageUrl: '',
        shortDescription: "Let your children have fun in the woods.",
        userId: 1,
        imageUrl: 'https://giftnowbucket.s3.amazonaws.com/1624857064753.png'
      },
      {
        title: 'Pacific Vacation Shorts',
        // imageUrl: '',
        shortDescription: "Head to the pool this weekend with your friends.",
        userId: 1,
        imageUrl: 'https://giftnowbucket.s3.amazonaws.com/1624857195682.png'
      },
      {
        title: 'Quality Meats',
        // imageUrl: '',
        shortDescription: "Ship this directly to your next barbecue.",

        userId: 1,
        imageUrl: 'https://giftnowbucket.s3.amazonaws.com/1624857774293.png'
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Products', {
      title: {
        [Op.in]: ['Tiny Air Purifier',
          'Vitamin Supplements',
          'Childrens Slingshot',
          'Pacific Vacation Shorts',
          'Quality Meats'
        ]
      }
    }, {});
  }
};
