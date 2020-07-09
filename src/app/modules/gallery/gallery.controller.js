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
            const { file } = request;
            const url = await this.service.upload(file);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Upload success",
                result: {
                    url,
                },
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new GalleryController();
