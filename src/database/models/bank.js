import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Bank extends Model {
    static associate(models) {
      Bank.hasMany(models.Shop, {
        as: "shop",
        foreignKey: "bankId",
      });
    }
  }
  Bank.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
  }, {
    defaultScope: {
      attributes: ["id", "name", "slug"],
    },
    sequelize,
    modelName: "Bank",
  });
  return Bank;
};
