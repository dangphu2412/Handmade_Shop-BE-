"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        as: "users",
        foreignKey: "roleId",
      });
      Role.belongsToMany(models.Permission, {
        as: "permissions",
        through: models.RolePermission,
        foreignKey: "roleId",
        otherKey: "permissionId",
      });
    }
  }

  Role.init({
    roleName: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deleteddAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: "Role",
  });
  return Role;
};