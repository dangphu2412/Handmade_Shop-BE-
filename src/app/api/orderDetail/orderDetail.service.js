import CoreService from "../../concept/Service";
import OrderDetailRepository from "./orderDetail.repository";

class OrderDetailService extends CoreService {
    constructor() {
        super();
        this.repository = OrderDetailRepository;
    }
}

export default new OrderDetailService();
