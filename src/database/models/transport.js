import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Transport extends Model {
    static associate(models) {
      Transport.belongsToMany(models.Shop, {
        as: "shops",
        through: "ShopTransports",
        foreignKey: "shopId",
        timestamps: false,
      });
      Transport.hasMany(models.Order, {
        as: "orders",
        foreignKey: "transportId",
      });
    }
  }
  Transport.init({
    brand: DataTypes.STRING,
    fee: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN,
  }, {
    scopes: {
      valid: {
        where: { status: true },
        attributes: ["id", "brand"],
      },
    },
    sequelize,
    modelName: "Transport",
  });
  return Transport;
};
