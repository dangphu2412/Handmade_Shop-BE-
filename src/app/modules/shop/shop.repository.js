import CoreRepository from "../../concept/Repository";
import { Shop } from "../../../database/models/index";

class ShopRepository extends CoreRepository {
    constructor() {
        super(Shop);
    }
}

export default new ShopRepository();
