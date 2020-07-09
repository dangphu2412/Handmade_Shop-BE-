import CoreHandler from "../../concept/Handler";
import TestController from "./test.controller";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class TestHandler extends CoreHandler {
    constructor() {
        super(TestController, AuthenService, AuthorizeService, null);
    }

    test() {
            return [
                // this.authen.verify,
                this.controller.call("getMany"),
            ];
    }
}

export default new TestHandler();
