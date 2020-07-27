import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";

class TransportRepository extends CoreRepository {
    constructor() {
        const { Transport } = Models;
        super(Transport);
    }
}

export default new TransportRepository();
