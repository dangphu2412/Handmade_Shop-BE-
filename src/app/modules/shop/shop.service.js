import slugTransfer from "speakingurl";

import CoreService from "../../concept/Service";
import ShopRepository from "./shop.repository";
import ServerError from "../../../errors/Server.error";


class ShopService extends CoreService {
    constructor() {
        super();
        this.repository = ShopRepository;
    }

    async createShop(payload) {
        try {
            payload.slug = slugTransfer(payload.name);
            console.log(payload);
            const shopInfo = await this.repository.create(payload);
            return shopInfo;
        } catch (error) {
            console.log(error);
            throw new ServerError("Server is crashing");
        }
    }
}

export default new ShopService();
