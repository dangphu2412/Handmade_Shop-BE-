import express from "express";
import AuthHandler from "./auth.handler";

const router = express.Router();

router.post("/signup", AuthHandler["signup"]());

router.post("/signin", AuthHandler["signin"]());

router.post("/oauth/google", AuthHandler["oauthGoogle"]());

export default router;
