import CoreRepository from "../../concept/Repository";
import { Shop } from "../../../database/models/index";

class ShopRepository extends CoreRepository {
    constructor() {
        super(User);
    }
}

export default new ShopRepository();
