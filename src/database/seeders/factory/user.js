import hash from "bcrypt";
import { Models } from "../../models";

const { User } = Models;

export default class SeedUser {
  static userSeeding(roleId) {
    const result = [];
    const pwd = SeedUser.getPwdHash();
    for (let i = 0; i < 30; i += 1) {
      const data = {
        username: `admin${i}@gmail.com`,
        name: `admin${i}`,
        slug: `admin${i}`,
        status: true,
        password: pwd,
        roleId,
        shopActive: false,
      };
      result.push(data);
    }

    return result;
  }

  static shopkeeperSeeding(roleId) {
    const result = [];
    const pwd = SeedUser.getPwdHash();
    for (let i = 31; i < 100; i += 1) {
      const data = {
        username: `admin${i}@gmail.com`,
        name: `admin${i}`,
        slug: `admin${i}`,
        status: true,
        password: pwd,
        roleId,
        shopActive: true,
      };
      result.push(data);
    }

    return result;
  }

  static adminSeeding(roleId) {
    return {
      username: "phu2412@gmail.com",
      name: "phu",
      slug: "phu",
      status: true,
      password: SeedUser.getPwdHash(),
      roleId,
      shopActive: true,
    };
  }

  static getPwdHash() {
    const password = "123123123";
    return hash.hashSync(password, 10);
  }

  static start(transaction, roleIds) {
    const data = [];
    const { userId, shopkeeperId, adminId } = roleIds;
    data.push(SeedUser.userSeeding(userId));
    data.push(SeedUser.shopkeeperSeeding(shopkeeperId));
    data.push(SeedUser.adminSeeding(adminId));
    console.log("====== Migrating User ==========");
    return User.bulkCreate(data.flat(), { transaction });
  }
}
