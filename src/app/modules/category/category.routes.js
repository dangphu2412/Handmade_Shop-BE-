import express from "express";
import CategoryHandler from "./category.handler";

const router = express.Router();

router.get("/categories", CategoryHandler["getCategories"]());

export default router;
