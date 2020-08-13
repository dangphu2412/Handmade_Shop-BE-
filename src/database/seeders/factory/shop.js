import slugTransfer from "speakingurl";
import { Models } from "../../models";
import Random from "./random";

const { Shop } = Models;

export default class SeedingShop {
  static async start(transaction) {
    console.log("====== Migrating Shop ==========");
    const shops = await SeedingShop.seedingShop(transaction);
    await SeedingShop.createTransports(shops, transaction);
  }

  static async seedingShop(transaction) {
      const result = [];
      for (let i = 31; i < 100; i += 1) {
        result.push({
          name: `admin${i}`,
          slug: slugTransfer(`admin${i}`),
          description: "Bla bla",
          cardNumber: Random.randomNumber(999, 10000),
          bankAccount: `admin${i}`,
          bankId: Random.randomNumber(1, 4),
          districtId: Random.randomNumber(1, 500),
          userId: i,
        });
      }
      return Shop.bulkCreate(result, { transaction });
  }

  static createTransports(shops, transaction) {
    return Promise.all(shops.map((shop) => {
      const first = Random.randomNumber(1, 4);
      let second = 1;
      while (second !== first) {
        second = Random.randomNumber(1, 4);
      }
      const transportIds = [first, second];
      return shop.addTransports(transportIds, { transaction });
    }));
  }
}
