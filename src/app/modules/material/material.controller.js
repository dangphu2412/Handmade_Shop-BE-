import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import MaterialService from "./material.service";

class MaterialController extends CoreController {
    constructor() {
        super();
        this.service = MaterialService;
    }
}

export default new MaterialController();
