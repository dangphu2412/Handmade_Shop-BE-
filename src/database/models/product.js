import Sequelize, { Model } from "sequelize";

const { Op } = Sequelize;

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
            model: models.Category.scope("defaultScope"),
            as: "category",
            required: false,
          },
        ],
      });
      Product.addScope("materials", {
        include: [
          {
            model: models.Material.scope("defaultScope"),
            as: "materials",
            through: { attributes: [] },
            required: false,
          },
        ],
      });
      Product.addScope("transports", {
        include: [
          {
            model: models.Transport.scope("valid"),
            as: "transports",
            through: { attributes: [] },
            required: false,
          },
        ],
      });
      Product.addScope("gallery", {
        include: [
          {
            model: models.Gallery.scope("defaultScope"),
            as: "gallery",
            required: false,
          },
        ],
      });
      Product.addScope("shop", {
        include: [
          {
            model: models.Shop.scope("getInfo"),
            as: "shop",
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
    thumbnail: DataTypes.STRING,
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
      getDetail: {
        where: { status: true },
        attributes: ["id", "name", "slug", "description", "price", "amount", "restAmount"],
      },
      withSoftDelete: {
        attributes: ["status", "deletedAt"],
      },
      fetchWithSlug(slug) {
        return {
          where: {
            slug: {
              [Op.iLike]: `%${slug}%`,
            },
          },
        };
      },
      productSoldOut: {
        where: {
          status: true,
          restAmount: 0,
        },
      },
      productInventory: {
        where: {
          status: true,
          restAmount: {
            [Op.gt]: 0,
          },
        },
      },
    },
    sequelize,
    modelName: "Product",
  });
  return Product;
};
