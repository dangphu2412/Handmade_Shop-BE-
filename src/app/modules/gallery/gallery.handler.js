import CoreHandler from "../../concept/Handler";
import GalleryController from "./gallery.controller";
import GalleryValidator from "./gallery.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";
import UploadHandler from "../../../middlewares/Uploader";

class GalleryHandler extends CoreHandler {
    constructor() {
        super(GalleryController, AuthenService, AuthorizeService, GalleryValidator);
    }

    uploadImage() {
        return [
            this.authen.call("verify"),
            UploadHandler,
            this.controller.call("uploadImage"),
        ];
    }
}

export default new GalleryHandler();
