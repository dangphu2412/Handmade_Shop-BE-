const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductMaterial extends Model {
  }
  ProductMaterial.init({
    productId: DataTypes.INTEGER,
    materialId: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: "ProductMaterial",
  });
  return ProductMaterial;
};
