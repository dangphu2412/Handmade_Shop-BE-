import express from "express";
import testRoute from "../modules/test/test.routes";
import authRoute from "../modules/auth/auth.routes";
import galleryRoute from "../modules/gallery/gallery.routes";
import categoryRoute from "../modules/category/category.routes";
import materialRoute from "../modules/material/material.routes";
import transportRoute from "../modules/transport/transport.routes";

const router = express.Router();

router.use(testRoute);
router.use(authRoute);
router.use(galleryRoute);
router.use(categoryRoute);
router.use(materialRoute);
router.use(transportRoute);

export default router;
