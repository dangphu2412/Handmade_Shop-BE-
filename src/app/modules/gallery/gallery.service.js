import fs from "fs";

import CoreService from "../../concept/Service";
import GalleryRepository from "./gallery.repository";
import UploadService from "../../../services/UploadImage";
import ServerError from "../../../errors/Server.error";

class GalleryService extends CoreService {
    constructor() {
        super();
        this.repository = GalleryRepository;
    }

    async upload(file) {
        try {
            const imgInfo = await UploadService.uploadImg(file.path);

            fs.unlinkSync(file.path);

            return imgInfo.url;
        } catch (error) {
            throw new ServerError("Service third pary is out of credit");
        }
    }
}

export default new GalleryService();
