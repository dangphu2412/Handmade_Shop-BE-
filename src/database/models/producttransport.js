const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductTransport extends Model {
  }
  ProductTransport.init({
    productId: DataTypes.INTEGER,
    transportId: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: "ProductTransport",
  });
  return ProductTransport;
};
