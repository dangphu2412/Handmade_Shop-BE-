/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import slugTransfer from "speakingurl";

import CoreService from "../../concept/Service";
import ShopRepository from "./shop.repository";
import AuthRepository from "../auth/auth.repository";
import LogicError from "../../../errors/Logic.error";
import { ROLE } from "../../../constants/role";

class ShopService extends CoreService {
    constructor() {
        super();
        this.repository = ShopRepository;
        this.authRepository = AuthRepository;
    }

    async getOwnerShop(userId) {
        const conditions = {
            userId,
        };
        return this.repository.getOne(conditions);
    }

    fetchOwnerProducts({ key, value, ...query }, userId) {
        let response;
        const conditions = { userId };
        const productScopes = ["category"];
        const scopes = [{ method: ["productInventory", productScopes] }];
        switch (key) {
            case "sold-out":
                scopes[0].method[0] = "productSoldOut";
                response = this.repository.getMany(query, scopes, conditions);
                break;
            case "inventory":
                response = this.repository.getMany(query, scopes, conditions);
                break;
            default:
                response = this.repository.getMany(query, scopes, conditions);
                break;
        }
        return response;
    }

    fetchProductsByShopSlug({ key, value, ...query }, slug) {
        let response;
        const conditions = { slug };
        const productScopes = ["category"];
        const scopes = [{ method: ["productInventory", productScopes] }];
        switch (key) {
            case "sold-out":
                scopes[0].method[0] = "productSoldOut";
                response = this.repository.getMany(query, scopes, conditions);
                break;
            case "inventory":
                response = this.repository.getMany(query, scopes, conditions);
                break;
            default:
                response = this.repository.getMany(query, scopes, conditions);
                break;
        }
        return response;
    }

    async createShop(payload) {
        const { name, userId } = payload;

        payload.slug = slugTransfer(name);

        const isExist = await this.authRepository.getByPk(userId);

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
