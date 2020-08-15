import UserController from "./user.controller";
import UserValidator from "./user.validator";
import { ROLE, METHOD, MODULE } from "../../../constants/role";

import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class UserHandler {
    constructor() {
        this.controller = UserController;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = UserValidator;
    }

    getAllUsers() {
        return [
            this.authen.call("verify"),
            this.authorize.WithScope(ROLE.ADMIN, METHOD.GET, MODULE.USER),
            this.controller.call("getManyAndCountAll"),
        ];
    }

    patchStatusUser() {
        return [
            this.authen.call("verify"),
            this.validator.patchParams(),
            this.authorize.WithScope(ROLE.ADMIN, METHOD.GET, MODULE.USER),
            this.controller.call("patchStatusUser"),
        ];
    }
}

export default new UserHandler();
