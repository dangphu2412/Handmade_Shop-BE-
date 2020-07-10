import slugTransfer from "speakingurl";

import CoreService from "../../concept/Service";
import ShopRepository from "./shop.repository";
import AuthRepository from "../auth/auth.repository";
import ServerError from "../../../errors/Server.error";


class ShopService extends CoreService {
    constructor() {
        super();
        this.repository = ShopRepository;
        this.authRepository = AuthRepository;
    }

    async createShop(payload) {
        try {
            payload.slug = slugTransfer(payload.name);
            const shopInfo = await this.repository.create(payload);

            await this.authRepository.updateOne({
                shopActive: true,
            }, payload.userId);
            return shopInfo;
        } catch (error) {
            console.log(error);
            throw new ServerError("Server is crashing");
        }
    }
}

export default new ShopService();
