'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductVote = sequelize.define('ProductVote', {
    voteSum: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {});
  ProductVote.associate = function(models) {
    ProductVote.belongsTo(models.User, { foreignKey: "userId" });
    ProductVote.belongsTo(models.Product, { foreignKey: "productId" });  };
  return ProductVote;
};

