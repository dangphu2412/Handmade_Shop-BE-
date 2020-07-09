import CoreRepository from "../../concept/Repository";
import { Transport } from "../../../database/models/index";

class TransportRepository extends CoreRepository {
    constructor() {
        super(Transport);
    }
}

export default new TransportRepository();
