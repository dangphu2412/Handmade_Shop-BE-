const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transport extends Model {
    static associate(models) {
      Transport.belongsToMany(models.Product, {
        as: "products",
        through: models.ProductTransport,
        foreignKey: "transportId",
        otherKey: "productId",
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
