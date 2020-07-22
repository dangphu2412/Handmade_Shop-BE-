import CoreHandler from "../../concept/Handler";
import MaterialController from "./material.controller";
import MaterialValidator from "./material.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class MaterialpHandler extends CoreHandler {
    constructor() {
        super(MaterialController, AuthenService, AuthorizeService, MaterialValidator);
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
