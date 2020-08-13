import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";
import ServerError from "../../../errors/Server.error";

class ShopRepository extends CoreRepository {
    constructor() {
        const { Shop } = Models;
        super(Shop);
    }

    _addRelationShopAndTransport(shop, transportIds, transaction = null) {
        try {
            return shop.addTransports(transportIds, {
                transaction,
            });
        } catch (error) {
            throw new ServerError("Your transports is not valid");
        }
    }

    _setRelationShopAndTransport(shop, transport, transaction = null) {
        try {
            return shop.setTransports(transport, {
                transaction,
            });
        } catch (error) {
            console.log(error);
            throw new ServerError("Your transports is not valid");
        }
    }
}

export default new ShopRepository();