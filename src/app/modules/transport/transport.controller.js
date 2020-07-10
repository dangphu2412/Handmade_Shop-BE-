import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import AuthService from "./transport.service";

class TransportController extends CoreController {
    constructor() {
        super();
        this.service = AuthService;
    }
}

export default new TransportController();
