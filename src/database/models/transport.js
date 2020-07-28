import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Transport extends Model {
    static associate(models) {
      Transport.belongsToMany(models.Product, {
        as: "products",
        through: "ProductTransports",
        foreignKey: "transportId",
        otherKey: "productId",
        timestamps: false,
      });
    }
  }
  Transport.init({
    brand: DataTypes.STRING,
    fee: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "Transport",
  });
  return Transport;
};
