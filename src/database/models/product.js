"use strict";

const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Material, {
        as: "materials",
        through: models.ProductMaterial,
        foreignKey: "productId",
        otherKey: "materialId",
      });
      Product.belongsToMany(models.Transport, {
        as: "products",
        through: models.ProductTransport,
        foreignKey: "productId",
        otherKey: "transportId",
      });
      Product.belongsTo(models.Shop, {
        as: "shops",
        foreignKey: "shopId",
      });
      Product.belongsTo(models.Category, {
        as: "categories",
        foreignKey: "categoryId",
      });
    }
  }
  Product.init({
    shopId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMBER,
    amount: DataTypes.NUMBER,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "Product",
  });
  return Product;
};
