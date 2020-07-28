import httpStatus from "http-status";

import CoreController from "../../concept/Controller";
import PaymentService from "./payment.service";

class PaymentController extends CoreController {
    constructor() {
        super();
        this.service = PaymentService;
    }
}

export default new PaymentController();
