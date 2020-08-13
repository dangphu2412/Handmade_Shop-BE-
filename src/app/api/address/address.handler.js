import AddressController from "./address.controller";
import AddressValidator from "./address.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class AddresspHandler {
    constructor() {
        this.controller = AddressController;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = AddressValidator;
    }

    getAddresses() {
        return [
            this.authen.call("verify"),
            this.controller.call("getAddresses"),
        ];
    }

    createAddress() {
        return [
            this.validator.checkCreateAddress(),
            this.authen.call("verify"),
            this.controller.call("createAddress"),
        ];
    }

    deleteAddress() {
        return [
            this.authen.call("verify"),
            this.controller.call("deleteAddress"),
        ];
    }
}

export default new AddresspHandler();
