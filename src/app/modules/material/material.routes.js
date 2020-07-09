import express from "express";
import MaterialHandler from "./material.handler";

const router = express.Router();

router.get("/materials", MaterialHandler["getMaterial"]());

export default router;
