import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";

class PaymentRepository extends CoreRepository {
    constructor() {
        const { Bank } = Models;
        super(Bank);
    }
}

export default new PaymentRepository();
