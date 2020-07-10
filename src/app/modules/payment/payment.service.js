import CoreService from "../../concept/Service";
import PaymentRepository from "./payment.repository";
import ServerError from "../../../errors/Server.error";

class PaymentService extends CoreService {
    constructor() {
        super();
        this.repository = PaymentRepository;
    }
}

export default new PaymentService();
