import Sequelize, { Model } from "sequelize";

const { Op } = Sequelize;

export default (sequelize, DataTypes) => {
  class Shop extends Model {
    static associate(models) {
      Shop.belongsTo(models.User, {
        as: "users",
        foreignKey: "userId",
      });
      Shop.hasMany(models.Product, {
        as: "products",
        foreignKey: "shopId",
      });
      Shop.belongsTo(models.District, {
        as: "districts",
        foreignKey: "districtId",
      });
      Shop.belongsTo(models.Bank, {
        as: "banks",
        foreignKey: "bankId",
      });
      Shop.addScope("productSoldOut", {
        include: [{
          model: models.Product,
          as: "products",
          where: {
              restAmount: 0,
          },
        }],
      });
      Shop.addScope("productInventory", {
        include: [{
          model: models.Product,
          as: "products",
          where: {
            restAmount: {
              [Op.gt]: 0,
          },
          },
        }],
      });
    }
  };
  Shop.init({
    userId: DataTypes.STRING,
    districtId: DataTypes.STRING,
    bankId: DataTypes.STRING,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    bankAccount: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Shop",
  });
  return Shop;
};