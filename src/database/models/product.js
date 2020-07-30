import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Material, {
        as: "materials",
        through: "ProductMaterials",
        foreignKey: "productId",
        otherKey: "materialId",
        timestamps: false,
      });
      Product.belongsToMany(models.Transport, {
        as: "transports",
        through: "ProductTransports",
        foreignKey: "productId",
        otherKey: "transportId",
        timestamps: false,
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
      // With scopes
      Product.addScope("category", {
        include: [
          {
            model: models.Category,
            as: "category",
            attributes: ["id", "name", "slug"],
            required: false,
            where: { status: true },
          },
        ],
      });
      Product.addScope("materials", {
        include: [
          {
            model: models.Material,
            as: "materials",
            through: { attributes: [] },
            attributes: ["id", "name", "slug"],
            required: false,
            where: { status: true },
          },
        ],
      });
      Product.addScope("transports", {
        include: [
          {
            model: models.Transport,
            as: "transports",
            through: { attributes: [] },
            attributes: ["id", "brand"],
            required: false,
            where: { status: true },
          },
        ],
      });
      Product.addScope("gallery", {
        include: [
          {
            model: models.Gallery,
            as: "gallery",
            attributes: ["id", "src", "kind"],
            required: false,
            where: { status: true },
          },
        ],
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
    scopes: {
      getIdForeign: {
        attributes: ["id", "shopId", "categoryId"],
      },
    },
    defaultScope: {
      where: { status: true },
      attributes: ["id", "name", "slug", "description", "price", "amount", "restAmount"],
    },
    sequelize,
    modelName: "Product",
  });
  return Product;
};
