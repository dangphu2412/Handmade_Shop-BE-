import slugTransfer from "speakingurl";
import { Models } from "../../models";
import Random from "./random";

const { Order } = Models;

export default class SeedingOrder {
  static async start(transaction) {
    console.log("====== Migrating Order ==========");
    await SeedingOrder.seedingOrder(transaction);
  }

  static async seedingOrder(transaction) {
      const result = [];
      for (let i = 1; i < 30; i += 1) {
        for (let j = 0; j < 30; j += 1) {
          const totalShip = Random.randomNumber(50000, 100000);
          const totalBill = Random.randomNumber(300000, 500000);
          result.push({
            shopId: Random.randomNumber(1, 69),
            userId: i,
            addressId: i,
            transportId: Random.randomNumber(1, 4),
            name: `admin${i}`,
            totalShip,
            totalBill,
            totalBillAndShip: totalShip + totalBill,
          });
        }
      }
      return Order.bulkCreate(result, { transaction });
  }
}
