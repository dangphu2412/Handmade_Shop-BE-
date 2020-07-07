"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        as: "roles",
        through: models.RolePermission,
        foreignKey: "permissionId",
        otherKey: "roleId",
      });
    }
  }

  Permission.init({
    method: DataTypes.STRING,
    module: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "Permission",
  });
  return Permission;
};
