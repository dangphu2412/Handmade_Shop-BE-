import express from "express";
import ShopHandler from "./shop.handler";

const router = express.Router();

router.get("/users/shop", ShopHandler["getOwnerShop"]());

router.get("/users/shop/products", ShopHandler["fetchOwnerProducts"]());

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
  *     responses:
  *       200:
  *         description: Create success
  *         schema:
  *           properties:
  *             status:
  *               type: integer
  *               format: int32
  *             message:
  *               type: string
  *             data:
  *               type: object
  *               schema: '#ref/definitions/Shop
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
  *   get:
  *     description: Get shop information
  *     tags: [Shop]
  *     security:
  *       authentication: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: authorization
  *         in: header
  *         type: string
  *         required: true
  *     responses:
  *       200:
  *         description: Get success
  *         schema:
  *           properties:
  *             status:
  *               type: integer
  *               format: int32
  *             message:
  *               type: string
  *             data:
  *               type: object
  *               schema:
  *                 $ref: '#/definitions/Shop'
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
  * /users/shop/products:
  *   get:
  *     description: Create shop by shop owner
  *     tags: [Product]
  *     security:
  *       authentication: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: authorization
  *         in: header
  *         type: string
  *         required: true
  *     responses:
  *       200:
  *         description: Get products owner
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
