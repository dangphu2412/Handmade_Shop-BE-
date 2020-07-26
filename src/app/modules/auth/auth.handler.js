import CoreHandler from "../../concept/Handler";
import AuthController from "./auth.controller";
import AuthValidator from "./auth.validator";
import { ROLE, METHOD, MODULE } from "../../../constants/role";

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

    verifyAccount() {
        return [
            this.validator.checkQueryVerifyToken(),
            this.validator.catchValidateErrors,
            this.controller.call("verifyAccount"),
        ];
    }

    signin() {
        return [
            this.validator.checkSignInData(),
            this.validator.catchValidateErrors,
            this.controller.call("signin"),
        ];
    }

    oauthGoogle() {
        return [
            this.controller.call("oauthGoogle"),
        ];
    }

    getAllUsers() {
        return [
            this.authen.call("verify"),
            this.authorize.WithScope(ROLE.ADMIN, METHOD.GET, MODULE.USER),
            this.controller.call("getMany"),
        ];
    }
}

export default new TestHandler();
