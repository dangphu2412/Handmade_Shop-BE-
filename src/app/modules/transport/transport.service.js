import CoreService from "../../concept/Service";
import TransportRepository from "./transport.repository";

class TransportService extends CoreService {
    constructor() {
        super();
        this.repository = TransportRepository;
    }
}

export default new TransportService();
