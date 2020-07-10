import CoreHandler from "../../concept/Handler";
import ShopController from "./shop.controller";
import ShopValidator from "./shop.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class ShopHandler extends CoreHandler {
    constructor() {
        super(ShopController, AuthenService, AuthorizeService, ShopValidator);
    }

    createShop() {
        return [
            this.validator.checkCreateShop(),
            this.validator.catchValidateErrors,
            this.authen.call("verify"),
            this.controller.call("createShop"),
        ];
    }
}

export default new ShopHandler();
