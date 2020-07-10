import slugTransfer from "speakingurl";

import CoreService from "../../concept/Service";
import ShopRepository from "./shop.repository";
import AuthRepository from "../auth/auth.repository";
import LogicError from "../../../errors/Logic.error";


class ShopService extends CoreService {
    constructor() {
        super();
        this.repository = ShopRepository;
        this.authRepository = AuthRepository;
    }

    async createShop(payload) {
        payload.slug = slugTransfer(payload.name);
        const isExist = await this.authRepository.getOne(payload.userId);

        if (isExist.shopActive) {
            throw new LogicError("Shop has been created");
        }

        const shopInfo = await this.repository.create(payload);

        await this.authRepository.updateOne({
            shopActive: true,
        }, payload.userId);
        return shopInfo;
    }
}

export default new ShopService();
