import CoreService from "../../concept/Service";
import PaymentRepository from "./payment.repository";

class PaymentService extends CoreService {
    constructor() {
        super();
        this.repository = PaymentRepository;
    }
}

export default new PaymentService();
