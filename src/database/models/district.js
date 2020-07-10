const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    static associate(models) {
      District.belongsTo(models.City, {
        as: "cities",
        foreignKey: "cityId",
      });
      District.hasMany(models.Shop, {
        as: "shops",
        foreignKey: "districtId",
      });
    }
  }
  District.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "District",
  });
  return District;
};
