"use strict";

const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {

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
