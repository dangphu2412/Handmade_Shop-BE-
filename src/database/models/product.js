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
      Product.addScope("category", (scopes = "defaultScope") => ({
          include: [
            {
              model: models.Category.scope(scopes),
              as: "category",
              required: false,
            },
          ],
        }));
      Product.addScope("materials", (scopes = "defaultScope") => ({
          include: [
            {
              model: models.Material.scope(scopes),
              as: "materials",
              through: { attributes: [] },
              required: false,
            },
          ],
        }));
      Product.addScope("gallery", (scopes = "defaultScope") => ({
          include: [
            {
              model: models.Gallery.scope(scopes),
              as: "gallery",
              required: false,
            },
          ],
        }));
      Product.addScope("shop", (scopes = "getInfo") => ({
          include: [
            {
              model: models.Shop.scope(scopes),
              as: "shop",
            },
          ],
        }));
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
    weight: DataTypes.NUMBER,
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
        attributes: ["id", "name", "slug", "description", "thumbnail", "price", "amount", "weight", "restAmount"],
      },
      withSoftDelete: {
        attributes: ["status", "deletedAt"],
      },
      searchByName(name) {
        return {
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
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
      // Migration options
      withThumbnail: {
        attributes: ["id", "thumbnail"],
      },
    },
    sequelize,
    modelName: "Product",
  });
  return Product;
};
