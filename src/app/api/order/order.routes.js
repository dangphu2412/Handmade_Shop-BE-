import express from "express";
import OrderHandler from "./order.handler";

const router = express.Router();

router.get("/shop/orders", OrderHandler["getOrders"]());

router.get("/users/orders", OrderHandler["getUserOrders"]());

router.get("/users/orders/:id", OrderHandler["getUserOrderDetail"]());

router.post("/users/orders", OrderHandler["postOrder"]());

router.patch("/user/orders/:id", OrderHandler["patchStatus"]());

export default router;
