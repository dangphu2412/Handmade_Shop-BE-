import { Models } from "../../models";
import slugTransfer from "speakingurl";
const { Shop } = Models;

export default class SeedingShop {
  static start(transaction) {
    console.log("====== Migrating Shop ==========");
    return Shop.bulkCreate(SeedingShop.shopSeeding(), { transaction });
  }

  static async seedingShop(transaction) {
      const result = [];
      for (let i = 31; i < 100; i += 1) {
        return {
          name:,
          slug: slugTransfer(name),
          thumbnail: thumbnail,
          description: description,
          cardNumber: cardNumber,
          bankAccount: bankAccount,
          bankId: bankId,
          districtId: districtId,
          userId: i,
        }
      }
      transportIds
  }
}
