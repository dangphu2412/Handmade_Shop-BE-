import OrderController from "./order.controller";
import OrderValidator from "./order.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";
import { ROLE, METHOD, MODULE } from "../../../constants/role";

class OrderpHandler {
    constructor() {
        this.controller = OrderController;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = OrderValidator;
    }

    getOrders() {
        return [
            this.authen.call("verify"),
            // this.authorize.WithScope(ROLE.SHOP_KEEPER, METHOD.GET, MODULE.ORDER),
            this.controller.call("getMany"),
        ];
    }

    postOrder() {
        return [
            this.authen.call("verify"),
            // this.authorize.WithScope(ROLE.USER, METHOD.POST, MODULE.ORDER),
            this.controller.call("createNewOrders"),
        ];
    }
}

export default new OrderpHandler();