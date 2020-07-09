import express from "express";
import GalleryHandler from "./gallery.handler";

const router = express.Router();

router.post("/gallery", GalleryHandler["uploadImage"]());

export default router;
