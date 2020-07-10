"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    static associate(models) {
      Shop.belongsTo(models.User, {
        as: "users",
        foreignKey: "userId",
      });
      Shop.belongsTo(models.District, {
        as: "districts",
        foreignKey: "districtId",
      });
      Shop.belongsTo(models.Bank, {
        as: "banks",
        foreignKey: "bankId",
      });
    }
  };
  Shop.init({
    userId: DataTypes.STRING,
    districtId: DataTypes.STRING,
    bankId: DataTypes.STRING,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    bank: DataTypes.STRING,
    bankAccount: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Shop",
  });
  return Shop;
};