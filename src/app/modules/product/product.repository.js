import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";

class ProductRepository extends CoreRepository {
    constructor() {
        const { Product } = Models;
        super(Product);
    }
}

export default new ProductRepository();
