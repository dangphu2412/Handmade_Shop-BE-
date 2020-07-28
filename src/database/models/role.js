import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        as: "users",
        foreignKey: "roleId",
      });
      Role.belongsToMany(models.Permission, {
        as: "permissions",
        through: "RolePermissions",
        foreignKey: "roleId",
        otherKey: "permissionId",
        timestamps: false,
      });
    }
  }

  Role.init({
    rolename: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: "Role",
  });
  return Role;
};
