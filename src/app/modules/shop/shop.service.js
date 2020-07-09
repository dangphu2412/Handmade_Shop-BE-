import CoreService from "../../concept/Service";
import ShopRepository from "./shop.repository";

class ShopService extends CoreService {
    constructor() {
        super();
        this.repository = ShopRepository;
    }
}

export default new ShopService();
