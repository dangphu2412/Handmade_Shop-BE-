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
            // this.validator.checkGetMaterials(),
            // this.validator.catchValidateErrors,
            this.controller.call("getMaterials"),
        ];
    }
}

export default new MaterialpHandler();
