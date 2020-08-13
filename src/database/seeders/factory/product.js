import slugTransfer from "speakingurl";
import { Models } from "../../models";
import Random from "./random";
import clothes from "./json/products.json";
import femaleClothes from "./json/products-female-clothes.json";
import shoes from "./json/products-shoes.json";
import accessories from "./json/products-accessories.json";
import toys from "./json/products-toys.json";

const { Product } = Models;

export default class SeedingProduct {
  static async start(transaction) {
    console.log("====== Migrating Products ==========");
    const products = await SeedingProduct.seedingProduct(transaction);
    await SeedingProduct.bulkAddMaterials(products, transaction);
  }

  static async seedingProduct(transaction) {
    const clothesProd = await Product.bulkCreate(SeedingProduct.loadProducts(clothes, 5), {
      returning: true,
      transaction,
      include: ["gallery"],
    });
    const femaleClothesProd = await Product.bulkCreate(SeedingProduct.loadProducts(femaleClothes, 6), {
      returning: true,
      transaction,
      include: ["gallery"],
    });
    const shoesProd = await Product.bulkCreate(SeedingProduct.loadProducts(shoes, Random.randomNumber(7, 8)), {
      returning: true,
      transaction,
      include: ["gallery"],
    });
    const acsrProd = await Product.bulkCreate(SeedingProduct.loadProducts(accessories, Random.randomNumber(9, 11)), {
      returning: true,
      transaction,
      include: ["gallery"],
    });
    const toysProd = await Product.bulkCreate(SeedingProduct.loadProducts(toys, 15), {
      returning: true,
      transaction,
      include: ["gallery"],
    });
    return [...clothesProd, ...shoesProd, ...acsrProd, ...femaleClothesProd, ...toysProd];
  }

  static loadProducts(products, categoryId) {
    const prefixThumb = "https://cf.shopee.vn/file/8126c2a895c8161d535a2a5153a40278_tn";
    return products
    .map((product) => {
      if (product.name === "") {
        return null;
      }
      const sold = Random.randomNumber(10, 50);
      const amount = Random.randomNumber(50, 100);
      return {
        name: product.name,
        slug: slugTransfer(product.name + Random.randomDate(new Date(2020, 0, 1), new Date())),
        shopId: Random.randomNumber(1, 30),
        categoryId,
        description: `${product.name} thật đẹp, nó mang lại sự quyến rũ`,
        price: parseInt(product.price.split("₫")[1], 10),
        reduce: (product.reduce) ? parseInt(product.reduce, 10) : 0,
        percent: (product.percent) ? parseInt(product.percent.split("%")[0], 10) : 0,
        restAmount: amount - sold,
        sold,
        weight: 50,
        districtId: Random.randomNumber(1, 500),
        thumbnail: product.thumbnail ? product.thumbnail : prefixThumb,
        gallery: [
          {
            type: "image",
            src: product.thumbnail ? product.thumbnail : prefixThumb,
          },
          {
            type: "image",
            src: "https://i.ibb.co/9cj28M4/blank-profile-pic.jpg",
          },
        ],
        status: true,
        createdAt: Random.randomDate(new Date(2020, 0, 1), new Date()),
        updatedAt: Random.randomDate(new Date(2020, 0, 1), new Date()),
      };
    })
    .filter((item) => item !== null);
  }

  static addMaterials(product, materials, transaction) {
    return product.addMaterials(materials, {
      transaction,
    });
  }

  static bulkAddMaterials(products, transaction) {
    return Promise.all(
      products.map((product) => {
        const first = Random.randomNumber(1, 10);
        let second = 1;
        let third = 2;
        while (second === first) {
          second = Random.randomNumber(1, 10);
        }
        while (second === third) {
          third = Random.randomNumber(1, 10);
        }
        const materialIds = [first, second, third];
        return SeedingProduct.addMaterials(product, materialIds, transaction);
      }),
    );
  }
}
