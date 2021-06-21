'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  }, {});

  Product.associate = function (models) {
    Product.belongsTo(models.User, { foreignKey: "userId" });

    Product.hasMany(models.ProductVote, {
      foreignKey: "productId",
      onDelete: "CASCADE",
      hooks: true,
    });

    Product.hasMany(models.Review, {
      foreignKey: "productId",
      onDelete: "CASCADE",
      hooks: true,
    });

  };
  return Product;
};


