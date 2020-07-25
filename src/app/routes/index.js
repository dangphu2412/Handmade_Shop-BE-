import express from "express";
import userRoute from "../modules/user/user.routes";
import authRoute from "../modules/auth/auth.routes";
import galleryRoute from "../modules/gallery/gallery.routes";
import categoryRoute from "../modules/category/category.routes";
import materialRoute from "../modules/material/material.routes";
import transportRoute from "../modules/transport/transport.routes";
import areaRoute from "../modules/area/area.routes";
import shopRoute from "../modules/shop/shop.routes";
import paymentRoute from "../modules/payment/payment.routes";
import productRoute from "../modules/product/product.routes";

const router = express.Router();

router.use(authRoute);
router.use(userRoute);
router.use(galleryRoute);
router.use(categoryRoute);
router.use(materialRoute);
router.use(transportRoute);
router.use(areaRoute);
router.use(shopRoute);
router.use(paymentRoute);
router.use(productRoute);

export default router;
