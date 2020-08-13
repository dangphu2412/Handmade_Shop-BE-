import MaterialController from "./material.controller";
import MaterialValidator from "./material.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class MaterialpHandler {
    constructor() {
        this.controller = MaterialController;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = MaterialValidator;
    }

    getMaterial() {
        return [
            this.controller.call("getMany"),
        ];
    }
}

export default new MaterialpHandler();
