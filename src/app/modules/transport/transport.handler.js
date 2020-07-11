import CoreHandler from "../../concept/Handler";
import TransportController from "./transport.controller";
import TransportValidator from "./transport.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class TransportpHandler extends CoreHandler {
    constructor() {
        super(TransportController, AuthenService, AuthorizeService, TransportValidator);
    }

    getTransport() {
        return [
            // this.validator.checkGetTransports(),
            // this.validator.catchValidateErrors,
            this.controller.call("getTransport"),
        ];
    }
}

export default new TransportpHandler();
