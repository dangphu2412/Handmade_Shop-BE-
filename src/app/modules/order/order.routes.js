import express from "express";
import OrderHandler from "./order.handler";

const router = express.Router();

router.get("/shop/orders", OrderHandler["getOrders"]());

router.post("/users/orders", OrderHandler["postOrder"]());

export default router;
