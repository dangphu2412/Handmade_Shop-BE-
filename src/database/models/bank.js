'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bank extends Model {
    static associate(models) {
      // define association here
    }
  };
  Bank.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bank',
  });
  return Bank;
};