import hash from "bcrypt";
import { Models } from "../../models";

const { User } = Models;

export default class SeedUser {
  static userSeeding() {
    const result = [];

    for (let i = 0; i < 30; i += 1) {
      const data = {
        username: `admin${i}@gmail.com`,
        name: `admin${i}`,
        slug: `admin${i}`,
        password: SeedUser.getPwdHash(),
        roleId: 3,
      };
      result.push(data);
    }

    return result;
  }

  static shopkeeperSeeding() {
    const result = [];

    for (let i = 31; i < 100; i += 1) {
      const data = {
        username: `admin${i}@gmail.com`,
        name: `admin${i}`,
        slug: `admin${i}`,
        password: SeedUser.getPwdHash(),
        roleId: 2,
      };
      result.push(data);
    }

    return result;
  }

  static adminSeeding() {
    return {
      username: "phu2412@gmail.com",
      name: "phu",
      slug: "phu",
      password: SeedUser.getPwdHash(),
      roleId: 1,
    };
  }

  static getPwdHash() {
    const password = "123123123";
    return hash.hashSync(password, 10);
  }

  static start() {
    const data = [];
    data.push(SeedUser.userSeeding);
    data.push(SeedUser.shopkeeperSeeding);
    data.push(SeedUser.adminSeeding);
    return User.bulkCreate(data.flat());
  }
}
