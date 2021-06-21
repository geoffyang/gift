'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
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


