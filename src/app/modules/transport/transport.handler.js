import TransportController from "./transport.controller";
import TransportValidator from "./transport.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class TransportpHandler {
    constructor() {
        this.controller = TransportController;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = TransportValidator;
    }

    getTransport() {
        return [
            // this.validator.checkGetTransports(),
            // this.validator.catchValidateErrors,
            this.controller.call("getMany"),
        ];
    }
}

export default new TransportpHandler();
