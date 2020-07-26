/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import slugTransfer from "speakingurl";

import CoreService from "../../concept/Service";
import ShopRepository from "./shop.repository";
import AuthRepository from "../auth/auth.repository";
import LogicError from "../../../errors/Logic.error";
import { ROLE } from "../../../constants/role";
import { Sequelize, Product } from "../../../database/models";

class ShopService extends CoreService {
    constructor() {
        super();
        this.repository = ShopRepository;
        this.authRepository = AuthRepository;
    }

    async getOwnerShop(userId) {
        return this.repository.getOneWithConditions({ userId });
    }

    fetchOwnerProducts({ page = 1, amount = 10, key = null, value = null }, userId) {
        let response;
        let relation = [];
        switch (key) {
            case "sold-out":
                relation = [{
                    model: Product,
                    as: "products",
                    where: {
                        restAmount: 0,
                    },
                }];
                response = this.repository.getMany({ page, amount }, { userId }, ["id"], null);
                break;
            case "inventory":
                const { Op } = Sequelize;
                relation = [{
                    model: Product,
                    as: "products",
                    where: {
                        restAmount: {
                            [Op.gt]: 0,
                        },
                    },
                }];
                response = this.repository.getMany({ page, amount }, { userId }, ["id"], relation);
                break;
            default:
                response = this.repository.getMany({ page, amount }, { userId }, ["id"], ["products"]);
                break;
        }
        return response;
    }

    async createShop(payload) {
        const { name, userId } = payload;

        payload.slug = slugTransfer(name);

        const isExist = await this.authRepository.getOne(userId);

        if (isExist.shopActive) {
            throw new LogicError("Shop has been created");
        }

        const response = await this.repository.create(payload);

        await this.authRepository.updateOne({
            roleId: ROLE.SHOP_KEEPER.key,
            shopActive: true,
        }, payload.userId);

        return response;
    }
}

export default new ShopService();
