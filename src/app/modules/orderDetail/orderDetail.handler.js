import OrderDetailController from "./orderDetail.controller";
import OrderDetailValidator from "./orderDetail.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class OrderDetailpHandler {
    constructor() {
        this.controller = OrderDetailController;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = OrderDetailValidator;
    }

    getOrderDetail() {
        return [
            // this.validator.checkGetOrderDetails(),
            // this.validator.catchValidateErrors,
            this.controller.call("getMany"),
        ];
    }
}

export default new OrderDetailpHandler();
