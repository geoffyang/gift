'use strict';



module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define('Product', {

    imageUrl: DataTypes.STRING,

    title: {
      type: DataTypes.STRING(32),
      allowNull: false
    },

    shortDescription: {
      type: DataTypes.STRING(140),
      allowNull: false
    },

    longDescription: DataTypes.TEXT,

    voteScore: DataTypes.INTEGER,

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
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

  Product.upload = async function ({ imageUrl, title, shortDescription, longDescription, userId }) {
    const product = await Product.create({
      imageUrl,
      title,
      shortDescription,
      longDescription,
      userId
    });
    return await Product.findByPk(product.id);
  };

  return Product;
};


