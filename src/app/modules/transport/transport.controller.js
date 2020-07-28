import CoreController from "../../concept/Controller";
import TransportService from "./transport.service";

class TransportController extends CoreController {
    constructor() {
        super();
        this.service = TransportService;
    }
}

export default new TransportController();
