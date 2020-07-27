import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";

class ShopRepository extends CoreRepository {
    constructor() {
        const { Shop } = Models;
        super(Shop);
    }
}

export default new ShopRepository();
