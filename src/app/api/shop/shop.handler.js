import ShopController from "./shop.controller";
import ShopValidator from "./shop.validator";
import { ROLE, METHOD, MODULE } from "../../../constants/role";

import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class ShopHandler {
    constructor() {
        this.controller = ShopController;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = ShopValidator;
    }

    getOwnerShop() {
        return [
            this.authen.call("verify"),
            // this.authorize.WithScope(ROLE.SHOP_KEEPER, METHOD.GET, MODULE.SHOP),
            this.controller.call("getOwnerShop"),
        ];
    }

    fetchOwnerProducts() {
        return [
            this.authen.call("verify"),
            this.authorize.WithScope(ROLE.SHOP_KEEPER, METHOD.GET, MODULE.SHOP_KEEPER_PRODUCT),
            this.controller.call("fetchOwnerProducts"),
        ];
    }

    fetchProductsByShopSlug() {
        return [
            this.controller.call("fetchProductsByShopSlug"),
        ];
    }

    createShop() {
        return [
            this.validator.checkCreateShop(),
            this.authen.call("verify"),
            this.authorize.WithScope(ROLE.USER, METHOD.POST, MODULE.SHOP),
            this.controller.call("createShop"),
        ];
    }
}

export default new ShopHandler();
