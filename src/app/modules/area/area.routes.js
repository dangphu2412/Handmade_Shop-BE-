import express from "express";
import AreaHandler from "./area.handler";

const router = express.Router();

router.get("/cities", AreaHandler["getCities"]());

router.get("/cities/:id/districts", AreaHandler["getDistrictsByCity"]());

export default router;
