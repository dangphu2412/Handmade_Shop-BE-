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

    async upload(files) {
        try {
            const pendingUploads = files.map((file) => {
                const { path } = file;
                return UploadService.uploadImg(path);
            });

            const uploadResponse = await Promise.all(pendingUploads);

            files.forEach((file) => {
                fs.unlinkSync(file.path);
            });

            const mappingUrls = uploadResponse.map((info) => info.url);
            return mappingUrls;
        } catch (error) {
            throw new ServerError("Service third pary is out of credit");
        }
    }
}

export default new GalleryService();
