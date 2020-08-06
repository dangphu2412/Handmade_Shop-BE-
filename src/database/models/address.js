import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
    }
  }
  Address.init({
    userId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    phone: DataTypes.NUMBER,
  }, {
    timestamps: false,
    sequelize,
    modelName: "Address",
  });
  return Address;
};
