import PaymentController from "./payment.controller";
import PaymentValidator from "./payment.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class PaymentHandler {
    constructor() {
        this.controller = PaymentController;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = PaymentValidator;
    }

    getBanks() {
        return [
            this.controller.call("getMany"),
        ];
    }
}

export default new PaymentHandler();
