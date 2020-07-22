import CoreService from "../../concept/Service";
import PaymentRepository from "./payment.repository";

class PaymentService extends CoreService {
    constructor() {
        super();
        this.repository = PaymentRepository;
    }

    getBanks(query) {
        return this.repository.getMany(query, null, ["id", "name", "slug"]);
    }
}

export default new PaymentService();
