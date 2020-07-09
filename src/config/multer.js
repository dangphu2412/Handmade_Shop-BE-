import multer from "multer";

const storage = {
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./src/upload");
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.jpeg`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // MAX = 5mb
  },
  fileFilter(req, file, callback) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return callback(null, true);
  }
      return callback({ message: "Unsupported file format" }, false);
  },
};

export default multer(storage).single("image");
