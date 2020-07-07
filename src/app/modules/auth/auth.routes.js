import express from "express";
import AuthHandler from "./auth.handler";

const router = express.Router();

router.post("/signup", AuthHandler["signup"]());

router.post("/oauth/google", AuthHandler["oauthGoogle"]());

export default router;
