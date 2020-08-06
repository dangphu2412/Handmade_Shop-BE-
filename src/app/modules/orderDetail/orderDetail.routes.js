import express from "express";
import OrderDetailHandler from "./orderDetail.handler";

const router = express.Router();

router.get("/OrderDetails", OrderDetailHandler["getOrderDetail"]());

export default router;
