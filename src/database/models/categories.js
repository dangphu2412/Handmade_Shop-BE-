import Sequelize, { Model } from "sequelize";
const { Op } = Sequelize;

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Category, {
        as: "children",
        foreignKey: "parentId",
      });
      Category.hasMany(models.Product, {
        as: "products",
        foreignKey: "categoryId",
      });
      Category.addScope("treeCategory", {
        attributes: ["id", "name", "slug", "parentId"],
        include: [{
            attributes: ["id", "name", "slug", "parentId"],
            model: models.Category,
            as: "children",
            nested: true,
        }],
      });
      Category.addScope("getProducts", (scopes = "defaultScope") => ({
        include: [{
          model: models.Product.scope(scopes),
          as: "products",
          foreignKey: "categoryId",
        }],
      }));
    }
  }
  Category.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  }, {
    defaultScope: {
      attributes: ["id", "name", "slug", "parentId"],
    },
    scopes: {
      withCategorySlug(value) {
        return {
          where: {
            slug: value,
          },
        };
      },
    },
    sequelize,
    modelName: "Category",
  });
  return Category;
};
