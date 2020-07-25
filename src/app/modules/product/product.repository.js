import CoreRepository from "../../concept/Repository";
import { Product } from "../../../database/models/index";

class ProductRepository extends CoreRepository {
    constructor() {
        super(Product);
    }
}

export default new ProductRepository();
