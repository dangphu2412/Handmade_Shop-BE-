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
        as: "district",
        foreignKey: "districtId",
      });
      Shop.belongsTo(models.Bank, {
        as: "bank",
        foreignKey: "bankId",
      });
      Shop.addScope("productSoldOut", {
        include: [{
          model: models.Product,
          as: "products",
          required: false,
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
      Shop.addScope("getDistrict", {
        include: [{
          model: models.District.scope("getCity"),
          as: "district",
        }],
      });
      Shop.addScope("getBank", {
        include: [{
          model: models.Bank,
          as: "bank",
        }],
      });
    }
  }

  Shop.init({
    userId: DataTypes.STRING,
    districtId: DataTypes.STRING,
    bankId: DataTypes.STRING,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    bankAccount: DataTypes.STRING,
  }, {
    scopes: {
      getInfo: {
        attributes: ["id", "name", "slug", "description", "thumbnail"],
      },
      getIdForeign: {
        attributes: ["id", "userId", "districtId", "bankId"],
      },
    },
    sequelize,
    modelName: "Shop",
  });
  return Shop;
};
