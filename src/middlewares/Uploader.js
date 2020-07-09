import { MulterError } from "multer";
import multerUploader from "../config/multer";

export default (req, res, next) => {
    multerUploader(req, res, (err) => {
        if (err instanceof MulterError) {
            return res.status(422).json({
                status: 422,
                message: err.message,
            });
        }
        return next();
    });
};
