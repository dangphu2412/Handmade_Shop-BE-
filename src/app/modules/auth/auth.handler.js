import CoreHandler from "../../concept/Handler";
import AuthController from "./auth.controller";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class TestHandler extends CoreHandler {
    constructor() {
        super(AuthController, AuthenService, AuthorizeService, null);
    }

    signup() {
            return [
                // this.authen.validator,
                this.controller.call("signup"),
            ];
    }
}

export default new TestHandler();
