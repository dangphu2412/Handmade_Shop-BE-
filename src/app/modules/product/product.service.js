import CoreService from "../../concept/Service";
import ProductRepository from "./product.repository";

class ProductService extends CoreService {
    constructor() {
        super();
        this.repository = ProductRepository;
    }
}

export default new ProductService();
