import express from "express";
import testRoute from "../modules/test/test.routes";
import authRoute from "../modules/auth/auth.routes";

const router = express.Router();

router.use(testRoute);
router.use(authRoute);

export default router;
