import CoreRepository from "../../concept/Repository";
import { Bank } from "../../../database/models/index";

class PaymentRepository extends CoreRepository {
    constructor() {
        super(Bank);
    }
}

export default new PaymentRepository();
