import CoreHandler from "../../concept/Handler";
import ProductController from "./product.controller";
import ProductValidator from "./product.validator";
import { ROLE, METHOD, MODULE } from "../../../constants/role";

import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class ProductpHandler extends CoreHandler {
    constructor() {
        super(ProductController, AuthenService, AuthorizeService, ProductValidator);
    }

    fetchProducts() {
        return [
            this.controller.call("getMany"),
        ];
    }

    createProduct() {
        return [
            this.validator.checkCreateProduct(),
            this.validator.catchValidateErrors,
            this.controller.call("createProduct"),
        ];
    }
}

export default new ProductpHandler();
