import express from "express";
import OrderHandler from "./order.handler";

const router = express.Router();

router.get("/shop/orders", OrderHandler["getOrders"]());

router.get("/users/orders", OrderHandler["getUserOrders"]());

router.post("/users/orders", OrderHandler["postOrder"]());

router.patch("/user/orders", OrderHandler["patchStatus"]());

export default router;
