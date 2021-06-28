'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    text: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.Review, { foreignKey: "productId" });  };

  Review.upload = async function ({ text, userId , productId}) {
    const review = await Review.create({
      text,
      userId,
      productId
    });
    return await Review.findByPk(review.id);
  };

  return Review;
};

