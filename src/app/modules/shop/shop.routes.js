import express from "express";
import AuthHandler from "./shop.handler";

const router = express.Router();

router.post("/shop", AuthHandler["createShop"]());

export default router;
