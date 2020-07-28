import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        as: "roles",
        through: "RolePermissions",
        foreignKey: "permissionId",
        otherKey: "roleId",
        timestamps: false,
      });
    }
  }

  Permission.init({
    method: DataTypes.STRING,
    module: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    defaultScope: {
      attributes: ["id", "method", "module"],
    },
    sequelize,
    modelName: "Permission",
  });
  return Permission;
};
