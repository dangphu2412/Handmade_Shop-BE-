import CoreHandler from "../../concept/Handler";
import UserController from "./user.controller";
import AuthValidator from "./user.validator";
import { ROLE, METHOD, MODULE } from "../../../constants/role";

import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class TestHandler extends CoreHandler {
    constructor() {
        super(UserController, AuthenService, AuthorizeService, AuthValidator);
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
