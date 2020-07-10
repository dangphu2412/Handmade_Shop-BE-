import CoreHandler from "../../concept/Handler";
import AreaController from "./area.controller";
import AreaValidator from "./area.validator";

import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class AreaHandler extends CoreHandler {
    constructor() {
        super(AreaController, AuthenService, AuthorizeService, AreaValidator);
    }

    getCities() {
        return [
            this.controller.call("getCities"),
        ];
    }

    getDistrictsByCity() {
        return [
            this.validator.checkParamsId(),
            this.validator.catchValidateErrors,
            this.controller.call("getDistrictsByCityId"),
        ];
    }
}

export default new AreaHandler();
