import express from "express";
import ShopHandler from "./shop.handler";

const router = express.Router();

router.post("/users/shop", ShopHandler["createShop"]());

export default router;

/**
  * @swagger
  * tags:
  *   name: Shop
  *   description: Shop
  */

/**
  * @swagger
  * /users/shop:
  *   post:
  *     description: Create shop by shop owner
  *     tags: [Shop]
  *     security:
  *       authentication: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: Create shop success
  *         in: body
  *         type: string
  *         required: true
  *         schema:
  *             $ref: "#/definitions/Shop"
  *     responses:
  *       200:
  *         description: Sign in success
  *         schema:
  *           properties:
  *             status:
  *               type: integer
  *               format: int32
  *             message:
  *               type: string
  *       401:
  *         description: Unauthenticated
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  *       403:
  *         description: Unauthorized
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  *       422:
  *         description: Invalid format of comment
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  *       500:
  *         description: Third party is out of service
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  */
