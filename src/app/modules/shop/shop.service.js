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
        return this.repository.getOneWithConditions({ userId });
    }

    fetchOwnerProducts(query, userId) {
        return this.repository.getMany(query, null, null, ["products"]);
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
