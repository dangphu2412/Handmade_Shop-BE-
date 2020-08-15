import { Model } from "sequelize";

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
      Shop.belongsToMany(models.Transport, {
        as: "transports",
        through: "ShopTransports",
        foreignKey: "shopId",
        otherKey: "transportId",
        timestamps: false,
      });
      // Scopes
      Shop.addScope("products", (scopes = "defaultScope") => ({
        include: [{
          model: models.Product.scope(scopes),
          as: "products",
          required: false,
        }],
      }));
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
      Shop.addScope("transports", (scopes = "valid") => ({
        include: [
          {
            model: models.Transport.scope(scopes),
            as: "transports",
            through: { attributes: [] },
            required: false,
          },
        ],
      }));
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
    status: DataTypes.BOOLEAN,
  }, {
    scopes: {
      getInfo: {
        attributes: ["id", "name", "slug", "description", "thumbnail"],
      },
      getIdForeign: {
        attributes: ["id", "userId", "districtId", "bankId"],
      },
      getIdOnly: {
        attributes: ["id"],
      },
    },
    sequelize,
    modelName: "Shop",
  });
  return Shop;
};
