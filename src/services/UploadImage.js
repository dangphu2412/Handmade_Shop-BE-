import { imgTransformation, uploadHandler } from "../config/cloudinary";

class UploadImage {
    constructor() {
        this.imgConfig = imgTransformation;
    }

    uploadImg(path) {
        return uploadHandler.uploader.upload(path, this.imgConfig);
    }

    // Improve future
    removeImg(url) {
        return url;
    }
}

export default new UploadImage();
