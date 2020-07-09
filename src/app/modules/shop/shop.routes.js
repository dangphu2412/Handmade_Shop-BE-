import express from "express";
import ShopHandler from "./shop.handler";

const router = express.Router();

router.post("/users/shop", ShopHandler["createShop"]());

export default router;
