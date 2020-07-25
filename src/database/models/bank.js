import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Bank extends Model {
    static associate(models) {
      Bank.hasMany(models.Shop, {
        as: "shops",
        foreignKey: "bankId",
      });
    }
  }
  Bank.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "Bank",
  });
  return Bank;
};
