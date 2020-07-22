import httpStatus from "http-status";

import CoreController from "../../concept/Controller";
import PaymentService from "./payment.service";

class PaymentController extends CoreController {
    constructor() {
        super();
        this.service = PaymentService;
    }

    async getBanks(request, response) {
        try {
            const { query } = request;
            const data = await this.service.getBanks(query);
            return response.json({
                status: httpStatus.OK,
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new PaymentController();
