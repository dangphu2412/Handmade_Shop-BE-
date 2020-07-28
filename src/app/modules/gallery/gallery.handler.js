import GalleryController from "./gallery.controller";
import GalleryValidator from "./gallery.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";
import UploadHandler from "../../../middlewares/Uploader";

class GalleryHandler {
    constructor() {
        this.controller = GalleryController;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = GalleryValidator;
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
