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
    sequelize,
    modelName: "User",
  });
  return User;
};
