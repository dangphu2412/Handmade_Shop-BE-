import { Models } from "../../models";

const { Material } = Models;

export default class SeedingMaterial {
  static start(transaction) {
    console.log("====== Migrating Material ==========");
    return Material.bulkCreate(SeedingMaterial.seedingMaterial(), { transaction });
  }

  static seedingMaterial() {
    return [
      {
        name: "Xương",
        slug: "xuong",
      },
      {
        name: "Vãi",
        slug: "vai",
      },
      {
        name: "Vải Cotton",
        slug: "vai-cotton",
      },
      {
        name: "Da",
        slug: "da",
      },
      {
        name: "Giấy",
        slug: "giay",
      },
      {
        name: "Gỗ",
        slug: "go",
      },
      {
        name: "Ruby",
        slug: "ruby",
      },
      {
        name: "Vải kaki",
        slug: "vai-kaki",
      },
      {
        name: "Vải Jean",
        slug: "vai-jean",
      },
      {
        name: "Vải len",
        slug: "vai-len",
      },
    ];
  }
}