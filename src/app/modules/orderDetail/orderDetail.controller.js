import CoreController from "../../concept/Controller";
import OrderDetailService from "./orderDetail.service";

class OrderDetailController extends CoreController {
    constructor() {
        super();
        this.service = OrderDetailService;
    }
}

export default new OrderDetailController();
