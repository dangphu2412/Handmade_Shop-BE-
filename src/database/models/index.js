import { Sequelize as DatabaseInstance, DataTypes } from "sequelize";
import loadingConfig from "../../config/database";

import UserModel from "./user";
import RoleModel from "./role";
import PermissionModel from "./permission";
import BankModel from "./bank";
import CategoryModel from "./categories";
import CityModel from "./city";
import DistrictModel from "./district";
import GalleryModel from "./gallery";
import MaterialModel from "./material";
import ProductModel from "./product";
import ShopModel from "./shop";
import TransportModel from "./transport";

const _env = process.env.NODE_ENV || "development";
const config = loadingConfig[_env];
const models = {};

export const sequelize = new DatabaseInstance(
  config.database,
  config.username,
  config.password,
  config,
);

models.User = UserModel(sequelize, DataTypes);
models.Role = RoleModel(sequelize, DataTypes);
models.Permission = PermissionModel(sequelize, DataTypes);
models.Bank = BankModel(sequelize, DataTypes);
models.Category = CategoryModel(sequelize, DataTypes);
models.City = CityModel(sequelize, DataTypes);
models.District = DistrictModel(sequelize, DataTypes);
models.Gallery = GalleryModel(sequelize, DataTypes);
models.Material = MaterialModel(sequelize, DataTypes);
models.Product = ProductModel(sequelize, DataTypes);
models.Shop = ShopModel(sequelize, DataTypes);
models.Transport = TransportModel(sequelize, DataTypes);

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default sequelize;

export const Models = models;

export const Sequelize = DatabaseInstance;
