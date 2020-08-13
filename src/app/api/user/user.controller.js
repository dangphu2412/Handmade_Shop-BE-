import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import UserService from "./user.service";

class UserController extends CoreController {
    constructor() {
        super();
        this.service = UserService;
    }
}

export default new UserController();
