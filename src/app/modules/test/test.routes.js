import express from "express";
import TestHandler from "./test.handler";
import { User, Role, Permission } from "../../../database/models/index";

const router = express.Router();

router.get("/test", TestHandler["test"]());

router.get("/test/role", async (req, res) => {
    const { id } = req.query;
    const scope = await User.findOne({
        where: { id },
        include: [{
            model: Role,
            as: "role",
            attributes: ["roleName"],
            include: [{
                model: Permission,
                as: "permissions",
                attributes: ["id", "method", "module"],
                where: { status: true }
            }],
        }],
    });
    return res.status(200).json(scope);
})
export default router;
