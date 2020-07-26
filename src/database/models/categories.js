import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Category, {
        as: "children",
        foreignKey: "parentId",
      });
    }
  }
  Category.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "Category",
  });
  return Category;
};
