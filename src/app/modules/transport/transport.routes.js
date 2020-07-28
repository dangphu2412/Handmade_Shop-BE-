import express from "express";
import TransportHandler from "./transport.handler";

const router = express.Router();

router.get("/transports", TransportHandler["getTransport"]());

export default router;
