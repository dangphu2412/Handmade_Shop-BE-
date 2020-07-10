import express from "express";
import ProductHandler from "./product.handler";

const router = express.Router();

router.post("/users/shop/product", ProductHandler["createProduct"]());

export default router;
