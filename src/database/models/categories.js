import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Category, {
        as: "children",
        foreignKey: "parentId",
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
    sequelize,
    modelName: "Category",
  });
  return Category;
};
