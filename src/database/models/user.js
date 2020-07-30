import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        as: "role",
        foreignKey: "roleId",
      });
      User.hasOne(models.Shop, {
        as: "shop",
        foreignKey: "userId",
      });
      User.addScope("authorize", {
        include: [{
          model: models.Role,
          as: "role",
          attributes: ["rolename"],
          include: [{
              model: models.Permission,
              as: "permissions",
              attributes: ["method", "module"],
              where: { status: true },
              through: { attributes: [] },
          }],
        }],
      });
      User.addScope("getShopDetail", (scopes) => {
        return {
          include: [{
            model: models.Shop.scope(scopes),
            as: "shop",
            where: { status: true },
            required: false,
          }],
        };
      });
    }
  }

  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING(50),
    slug: DataTypes.STRING(50),
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    shopActive: DataTypes.BOOLEAN,
  }, {
    defaultScope: {
      attributes: ["id", "username", "name", "slug", "password", "avatar", "shopActive", "status"],
    },
    scopes: {
      test: {
        attributes: ["id", "username"],
      },
    },
    sequelize,
    modelName: "User",
  });
  return User;
};
