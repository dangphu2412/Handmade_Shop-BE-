import CoreHandler from "../../concept/Handler";
import PaymentController from "./payment.controller";
import PaymentValidator from "./payment.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class PaymentHandler extends CoreHandler {
    constructor() {
        super(PaymentController, AuthenService, AuthorizeService, PaymentValidator);
    }

    getBanks() {
        return [
            this.controller.call("getBanks"),
        ];
    }
}

export default new PaymentHandler();
