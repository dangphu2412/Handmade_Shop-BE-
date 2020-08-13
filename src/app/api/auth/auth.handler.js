import AuthController from "./auth.controller";
import AuthValidator from "./auth.validator";
import { ROLE, METHOD, MODULE } from "../../../constants/role";

import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class AuthHandler {
    constructor() {
        this.controller = AuthController;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = AuthValidator;
    }

    signup() {
        return [
            this.validator.checkSignUpData(),
            this.controller.call("signup"),
        ];
    }

    verifyAccount() {
        return [
            this.validator.checkQueryVerifyToken(),
            this.controller.call("verifyAccount"),
        ];
    }

    signin() {
        return [
            this.validator.checkSignInData(),
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

export default new AuthHandler();
