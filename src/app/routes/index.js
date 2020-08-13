import express from "express";
import userRoute from "../api/user/user.routes";
import authRoute from "../api/auth/auth.routes";
import galleryRoute from "../api/gallery/gallery.routes";
import categoryRoute from "../api/category/category.routes";
import materialRoute from "../api/material/material.routes";
import transportRoute from "../api/transport/transport.routes";
import areaRoute from "../api/area/area.routes";
import shopRoute from "../api/shop/shop.routes";
import paymentRoute from "../api/payment/payment.routes";
import productRoute from "../api/product/product.routes";
import orderRoute from "../api/order/order.routes";
import addressRoute from "../api/address/address.routes";

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
router.use(orderRoute);
router.use(addressRoute);

router.get("/test", async (req, res) => {
    return res.json({
        message: "TEST router, useful to debug !",
    });
});

export default router;
