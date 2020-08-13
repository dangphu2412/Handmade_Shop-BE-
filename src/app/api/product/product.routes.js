import express from "express";
import ProductHandler from "./product.handler";

const router = express.Router();

router.get("/products", ProductHandler["fetchProducts"]());

router.get("/products/:slug", ProductHandler["fetchProductDetail"]());

router.get("/users/shop/products/:id", ProductHandler["fetchProductDetailById"]());

router.post("/users/shop/products", ProductHandler["createProduct"]());

router.put("/users/shop/products/:id", ProductHandler["updateProduct"]());

router.delete("/users/shop/products/:id", ProductHandler["softDeleteProduct"]());

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
  *             data:
  *               type: object
  *               schema: '$ref/definitions/Product'
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

  /**
  * @swagger
  * /products:
  *   get:
  *     description: Get products
  *     tags: [Product]
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: page
  *         description: Sign in.
  *         in: query
  *         type: integer
  *       - name: amount
  *         description: Sign in.
  *         in: query
  *         type: integer
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
  *             data:
  *               type: array
  *               items:
  *                 type: object
  *                 $ref: '#/definitions/Product'
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
