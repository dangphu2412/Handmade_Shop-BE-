import CoreService from "../../concept/Service";
import TransportRepository from "./transport.repository";

class TransportService extends CoreService {
    constructor() {
        super();
        this.repository = TransportRepository;
    }

    getTransports(query) {
        return this.repository.getMany(query, null, ["id", "brand", "slug", "fee"]);
    }
}

export default new TransportService();
