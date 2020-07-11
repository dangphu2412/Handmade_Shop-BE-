import express from "express";
import AuthHandler from "./auth.handler";

const router = express.Router();

router.get("/users", AuthHandler["getAllUsers"]());

router.get("/users/mail/verify", AuthHandler["verifyAccount"]());

router.post("/signup", AuthHandler["signup"]());

router.post("/signin", AuthHandler["signin"]());

router.post("/oauth/google", AuthHandler["oauthGoogle"]());

export default router;
