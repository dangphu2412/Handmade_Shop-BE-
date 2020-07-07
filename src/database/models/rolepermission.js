"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
  }

  RolePermission.init(
    {
      roleId: DataTypes.INTEGER,
      permissionId: DataTypes.INTEGER,
    }, {
    sequelize,
    modelName: "RolePermission",
  });
  return RolePermission;
};
