import ProductController from "./product.controller";
import ProductValidator from "./product.validator";
import { ROLE, METHOD, MODULE } from "../../../constants/role";

import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class ProductpHandler {
    constructor() {
        this.controller = ProductController;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = ProductValidator;
    }

    fetchProducts() {
        return [
            this.controller.call("fetchProducts"),
        ];
    }

    fetchProductDetail() {
        return [
            this.controller.call("fetchProductDetail"),
        ];
    }

    fetchProductDetailById() {
        return [
            this.authen.call("verify"),
            this.authorize.WithScope(ROLE.SHOP_KEEPER, METHOD.GET, MODULE.SHOP_KEEPER_PRODUCT),
            this.controller.call("fetchProductDetailById"),
        ];
    }

    createProduct() {
        return [
            this.validator.checkCreateProduct(),
            this.controller.call("createProduct"),
        ];
    }

    updateProduct() {
        return [
            this.validator.checkCreateProduct(),
            this.authen.call("verify"),
            this.authorize.WithScope(ROLE.SHOP_KEEPER, METHOD.PUT, MODULE.PRODUCT),
            this.controller.call("updateProduct"),
        ];
    }

    softDeleteProduct() {
        return [
            this.authen.call("verify"),
            this.authorize.WithScope(ROLE.SHOP_KEEPER, METHOD.DELETE, MODULE.PRODUCT),
            this.controller.call("disableProduct"),
        ];
    }
}

export default new ProductpHandler();