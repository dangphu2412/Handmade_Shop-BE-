import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import GalleryService from "./gallery.service";

class GalleryController extends CoreController {
    constructor() {
        super();
        this.service = GalleryService;
    }

    async uploadImage(request, response) {
        try {
            const { files } = request;
            const url = await this.service.upload(files);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Upload success",
                data: url,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new GalleryController();
