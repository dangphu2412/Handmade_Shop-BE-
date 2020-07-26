import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Material, {
        as: "materials",
        through: models.ProductMaterial,
        foreignKey: "productId",
        otherKey: "materialId",
      });
      Product.belongsToMany(models.Transport, {
        as: "transports",
        through: models.ProductTransport,
        foreignKey: "productId",
        otherKey: "transportId",
      });
      Product.belongsTo(models.Shop, {
        as: "shop",
        foreignKey: "shopId",
      });
      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId",
      });
      Product.hasMany(models.Gallery, {
        as: "gallery",
        foreignKey: "productId",
      });
    }
  }
  Product.init({
    shopId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMBER,
    amount: DataTypes.NUMBER,
    restAmount: DataTypes.NUMBER,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "Product",
  });
  return Product;
};
