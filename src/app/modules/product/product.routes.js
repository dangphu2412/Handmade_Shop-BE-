import express from "express";
import ProductHandler from "./product.handler";

const router = express.Router();

router.post("/users/shop/product", ProductHandler["createProduct"]());

export default router;

/**
  * @swagger
  * tags:
  *   name: Product
  *   description: Product
  */

/**
  * @swagger
  * /users/shop/product:
  *   post:
  *     description: Create product by shop owner
  *     tags: [Product]
  *     security:
  *       authentication: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: Sign in.
  *         in: body
  *         type: string
  *         required: true
  *         schema:
  *             $ref: "#/definitions/Product"
  *     responses:
  *       200:
  *         description: Create product success
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
