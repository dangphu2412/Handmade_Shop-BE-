import express from "express";
import UserHandler from "./user.handler";

const router = express.Router();

router.get("/users", UserHandler["getAllUsers"]());

export default router;

/**
  * @swagger
  * tags:
  *   name: User
  *   description: User information
  */

/**
  * @swagger
  * tags:
  *   name: User
  *   description: User information
  */

/**
  * @swagger
  * /users:
  *   get:
  *     description: Get city by page and amount
  *     tags: [User]
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: page
  *         description: Page get list cities.
  *         in: query
  *         type: integer
  *       - name: amount
  *         description: Amount get list cities.
  *         in: query
  *         type: integer
  *     responses:
  *       200:
  *         description: Get cities success
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
  *                 $ref: '#/definitions/User
  *       401:
  *         description: UnUserenticated
  *         schema:
  *           type: object
  *           $ref: '#/definitions/ErrorResponse'
  *       403:
  *         description: UNUserorized
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
