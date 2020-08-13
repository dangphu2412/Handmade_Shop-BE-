import express from "express";
import PaymentHandler from "./payment.handler";

const router = express.Router();

router.get("/payments/banks", PaymentHandler["getBanks"]());

export default router;
