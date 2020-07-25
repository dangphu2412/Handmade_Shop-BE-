import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
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
