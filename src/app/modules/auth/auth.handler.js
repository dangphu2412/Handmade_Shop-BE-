import CoreHandler from "../../concept/Handler";
import AuthController from "./auth.controller";
import AuthValidator from "./auth.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class TestHandler extends CoreHandler {
    constructor() {
        super(AuthController, AuthenService, AuthorizeService, AuthValidator);
    }

    signup() {
        return [
            this.validator.checkSignUpData(),
            this.validator.catchValidateErrors,
            this.controller.call("signup"),
        ];
    }

    oauthGoogle() {
        return [
            this.controller.call("oauthGoogle"),
        ];
    }
}

export default new TestHandler();
