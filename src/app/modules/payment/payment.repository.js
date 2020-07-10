import CoreRepository from "../../concept/Repository";
import { Payment } from "../../../database/models/index";

class PaymentRepository extends CoreRepository {
    constructor() {
        super(Payment);
    }
}

export default new PaymentRepository();
