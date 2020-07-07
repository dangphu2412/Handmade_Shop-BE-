"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        as: "role",
        foreignKey: "roleId",
      });
    }
  }

  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING(50),
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "User",
  });
  return User;
};
